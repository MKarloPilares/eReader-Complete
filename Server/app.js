const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
var mysql = require('mysql2');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mharkarlo29.",
    database: "new_ereader_schema"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.use(cors());
app.use(express.json());

const defaultImagePath = 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\blankthumb.jpg';
const defaultAudioPath = 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\DirOral.m4a';

function query(connection, sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  }
});

const upload = multer({ storage: storage });


{/* From Here */}
app.post("/lessons", (req, res) => {
  const { Language } = req.body;
  con.query(`SELECT * FROM lessons where LessLang = "${Language}"`, (err,result) => {
      if (err) throw err;
      console.log(result)
      res.json({message: result});
  });
});

app.post("/chapters", (req, res) => {
  const { LessName } = req.body;
  con.query(`SELECT * FROM chapters where LessName = "${LessName}"`, (err,result) => {
      if (err) throw err;
      console.log(result)
      res.json({message: result});
  });
});

app.post("/lesson_questions", (req, res) => {
  const { ChapName } = req.body;
  console.log(ChapName)
  con.query(`SELECT * FROM lessons_questions where ChapName = "${ChapName}"`, (err,result) => {
      if (err) throw err;
      console.log(result)
      res.json({message: result});
  });
});

app.post("/assessments", (req, res) => {
  const { Language } = req.body;
  con.query(`SELECT * FROM assessments where AssLang = "${Language}"`, (err,result) => {
      if (err) throw err;
      console.log(result)
      res.json({message: result});
  });
});

app.post("/assessment_questions", (req, res) => {
  const { AssName } = req.body;
  con.query(`SELECT * FROM ass_questions where AssName = "${AssName}"`, (err,result) => {
      if (err) throw err;
      console.log(result)
      res.json({message: result});
  });
});


app.post("/new_assessment", upload.single('AssImg'), async (req, res) => {
  const { AssName, AssDesc, AssLang } = req.body;

  try {
    if (!req.file) {
      // Read the default image file
      const data = await fs.promises.readFile(defaultImagePath);

      const sql = 'INSERT INTO assessments (AssName, AssDesc, AssImg, AssLang) VALUES (?, ?, ?, ?)';
      await query(con, sql, [AssName, AssDesc, data, AssLang]);
      console.log('Assessment added successfully without image');
      return res.status(201).json({ message: 'Assessment added successfully without image' });
    } else {
      const AssImgPath = "\\eReader\\Uploads\\" + req.file.filename;
      const data = await fs.promises.readFile(AssImgPath);

      const sql = 'INSERT INTO assessments (AssName, AssDesc, AssImg, AssLang) VALUES (?, ?, ?, ?)';
      await query(con, sql, [AssName, AssDesc, data, AssLang]);

      console.log('Assessment added successfully with image');
      return res.status(201).json({ message: 'Assessment added successfully with image' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err });
  }
});

app.post("/new_assessment_question", upload.fields([{ name: 'AssImg' }, { name: 'AssAud' }]), async (req, res) => {
  const { Quest, AssAns, AssName } = req.body;

  let ImgData, AudData;

  try {
    ImgData = await fs.promises.readFile(defaultImagePath);
    AudData = await fs.promises.readFile(defaultAudioPath);
  } catch (err) {
    console.error('Error reading default files:', err);
    return res.status(500).json({ message: 'Failed to read default files', error: err });
  }

  try {
    if (!req.files || (!req.files.AssImg && !req.files.AssAud)) {
      const sql = 'INSERT INTO ass_questions (Quest, AssAns, AssImg, AssAud, AssName) VALUES (?, ?, ?, ?, ?)';
      await query(con, sql, [Quest, AssAns, ImgData, AudData, AssName]);
      console.log('Assessment added successfully without image and audio');
      return res.status(201).json({ message: 'Assessment added successfully without image and audio' });
    } else {
      if (req.files.AssImg) {
        const AssImgPath = req.files.AssImg[0].path;
        ImgData = await fs.promises.readFile(AssImgPath);
      }
      if (req.files.AssAud) {
        const AssAudPath = req.files.AssAud[0].path;
        AudData = await fs.promises.readFile(AssAudPath);
      }

      const sql = 'INSERT INTO ass_questions (Quest, AssAns, AssImg, AssAud, AssName) VALUES (?, ?, ?, ?, ?)';
      await query(con, sql, [Quest, AssAns, ImgData, AudData, AssName]);
      console.log('Assessment added successfully with image and/or audio');
      return res.status(201).json({ message: 'Assessment added successfully with image and/or audio' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err });
  }
});

app.post("/new_lesson", upload.single('LessImg'), async (req, res) => {
  const { lessName, lessDesc, LessLang } = req.body;

  try {
    if (!req.file) {
      // Read the default image file
      const data = await fs.promises.readFile(defaultImagePath);

      const sql = 'INSERT INTO lessons (lessName, lessDesc, LessImg, LessLang) VALUES (?, ?, ?, ?)';
      await query(con, sql, [lessName, lessDesc, data, LessLang]);
      console.log('Assessment added successfully without image');
      return res.status(201).json({ message: 'Assessment added successfully without image' });
    } else {
      const LessImgPath = "\\eReader\\Uploads\\" + req.file.filename;
      const data = await fs.promises.readFile(LessImgPath);

      const sql = 'INSERT INTO lessons (lessName, lessDesc, LessImg, LessLang) VALUES (?, ?, ?, ?)';
      await query(con, sql, [lessName, lessDesc, data, LessLang]);

      console.log('Assessment added successfully with image');
      return res.status(201).json({ message: 'Assessment added successfully with image' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err });
  }
});

app.post("/new_chapter", upload.single('ChapImg'), async (req, res) => {
  const { ChapName, ChapDesc, LessName } = req.body;

  try {
    if (!req.file) {
      // Read the default image file
      const data = await fs.promises.readFile(defaultImagePath);

      const sql = 'INSERT INTO chapters (ChapName, ChapDesc, ChapImg, LessName) VALUES (?, ?, ?, ?)';
      await query(con, sql, [ChapName, ChapDesc, data, LessName]);
      console.log('Chapter added successfully without image');
      return res.status(201).json({ message: 'Assessment added successfully without image' });
    } else {
      const ChapImgPath = "\\eReader\\Uploads\\" + req.file.filename;
      const data = await fs.promises.readFile(ChapImgPath);

      const sql = 'INSERT INTO chapters (ChapName, ChapDesc, ChapImg, LessName) VALUES (?, ?, ?, ?)';
      await query(con, sql, [ChapName, ChapDesc, data, LessName]);

      console.log('Chapter added successfully with image');
      return res.status(201).json({ message: 'Assessment added successfully with image' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err });
  }
});

app.post("/new_chapter_question", upload.fields([{ name: 'QuestCard' }, { name: 'QuestAud' }]), async (req, res) => {
  const { ChapName, QuestAns } = req.body;

  try {
    if (!req.files || (!req.files.QuestCard && !req.files.QuestAud)) {
      // Read the default image file
      const ImgData = await fs.promises.readFile(defaultImagePath);
      const AudData = await fs.promises.readFile(defaultAudioPath);

      const sql = 'INSERT INTO lessons_questions (ChapName, QuestCard, QuestAns, QuestAud) VALUES (?, ?, ?, ?)';
      await query(con, sql, [ChapName, ImgData, QuestAns, AudData]);
      console.log('Question added successfully without Image and Audio');
      return res.status(201).json({ message: 'Question added successfully without Image and Audio' });
    } else {

      if (req.files.QuestCard) {
        AssImgPath = "\\eReader\\Uploads\\" + req.files.QuestCard[0].filename;
        ImgData = await fs.promises.readFile(AssImgPath);
      }
  
      if (req.files.QuestAud) {
        AssAudPath = "\\eReader\\Uploads\\" + req.files.QuestAud[0].filename;
        AudData = await fs.promises.readFile(AssAudPath);
      }

      const sql = 'INSERT INTO lessons_questions (ChapName, QuestCard, QuestAns, QuestAud) VALUES (?, ?, ?, ?)';
      await query(con, sql, [ChapName, ImgData, QuestAns, AudData]);

      console.log('Question added successfully with video');
      return res.status(201).json({ message: 'Question added successfully with files' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err });
  }
});

{/* Edit Functions */}
app.post("/edit_assessment", upload.single('AssImg'), async (req, res) => {
  const { AssName, AssDesc, AssLang, OrigAssName } = req.body;
  console.log(OrigAssName)

  try {
    if (!req.file) {
      // Read the default image file

      const sql = `UPDATE assessments SET AssName = ?, AssDesc = ?, AssLang = ? WHERE AssName = ?`;
      await query(con, sql, [AssName, AssDesc, AssLang, OrigAssName]);
      console.log('Assessment edited successfully without image');
      return res.status(201).json({ message: 'Assessment added successfully without image' });
    } else {
      const AssImgPath = "\\eReader\\Uploads\\" + req.file.filename;
      const data = await fs.promises.readFile(AssImgPath);

      const sql = `UPDATE assessments SET AssName = ?, AssDesc = ?, AssImg = ?, AssLang = ? where AssName = ?`;
      await query(con, sql, [AssName, AssDesc, data, AssLang, OrigAssName]);

      console.log('Assessment edited successfully with image');
      return res.status(201).json({ message: 'Assessment added successfully with image' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err });
  }
});

app.post("/edit_assessment_question", upload.fields([{ name: 'AssImg' }, { name: 'AssAud' }]), async (req, res) => {
  const { Quest, AssAns, AssName, OrigQuest } = req.body;
  console.log(OrigQuest)

  try {
    // Check if files are present
    //If No Files are Present
    if (!req.files || (!req.files.AssImg && !req.files.AssAud)) {

      const sql = 'UPDATE ass_questions SET Quest = ?, AssAns = ?, AssName = ? WHERE Quest = ?';
      await query(con, sql, [Quest, AssAns, AssName, OrigQuest]);
      console.log('Assessment added successfully without image');
      return res.status(201).json({ message: 'Assessment added successfully without image and audio' });
    } else {

      // If Only Image is Present
      if (req.files.AssImg && !req.files.AssAud) {
        AssImgPath = "\\eReader\\Uploads\\" + req.files.AssImg[0].filename;
        ImgData = await fs.promises.readFile(AssImgPath);
        const sql = 'UPDATE ass_questions SET Quest = ?, AssAns = ?, AssImg = ?, AssName = ? WHERE Quest = ?';
        await query(con, sql, [Quest, AssAns, ImgData, AssName, OrigQuest]);
  
        console.log('Assessment added successfully with image');
        return res.status(201).json({ message: 'Assessment added successfully with image and audio' });
      }
  
      // If Only Audio is Present
      if (req.files.AssAud && !req.files.AssImg) {
        AssAudPath = "\\eReader\\Uploads\\" + req.files.AssAud[0].filename;
        AudData = await fs.promises.readFile(AssAudPath);

        const sql = 'UPDATE ass_questions SET Quest = ?, AssAns = ?, AssAud= ?, AssName = ? WHERE Quest = ?';
        await query(con, sql, [Quest, AssAns, AudData, AssName, OrigQuest]);
  
        console.log('Assessment added successfully with image');
        return res.status(201).json({ message: 'Assessment added successfully with image and audio' });
      }
      
      //If Both Files Are Present
      if (req.files.AssImg && req.files.AssAud) {
        AssImgPath = "\\eReader\\Uploads\\" + req.files.AssImg[0].filename;
        ImgData = await fs.promises.readFile(AssImgPath);
          
        AssAudPath = "\\eReader\\Uploads\\" + req.files.AssAud[0].filename;
        AudData = await fs.promises.readFile(AssAudPath);

        const sql = 'UPDATE ass_questions SET Quest = ?, AssAns = ?, AssImg = ?, AssAud = ?, AssName = ? WHERE Quest = ?';
        await query(con, sql, [Quest, AssAns, ImgData, AudData, AssName, OrigQuest]);

        console.log('Assessment added successfully with image');
        return res.status(201).json({ message: 'Assessment added successfully with image and audio' });
      }
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err });
  }
});

app.post("/edit_lesson", upload.single('LessImg'), async (req, res) => {
  const { lessName, lessDesc, LessLang, OrigLessName } = req.body;

  try {
    if (!req.file) {

      let sql = 'UPDATE lessons SET lessName = ?, lessDesc = ?, LessLang = ? WHERE lessName = ?';
      await query(con, sql, [lessName, lessDesc, LessLang, OrigLessName]);
      sql = 'UPDATE chapters SET lessName = ? WHERE lessName = ?';
      await query(con, sql, [lessName, OrigLessName]);
      console.log('Lesson edited successfully without image');
      return res.status(201).json({ message: 'Lesson added successfully without image' });
    } else {
      const LessImgPath = "\\eReader\\Uploads\\" + req.file.filename;
      const data = await fs.promises.readFile(LessImgPath);

      let sql = 'UPDATE lessons SET lessName = ?, lessDesc = ?, LessImg = ?, LessLang = ? WHERE lessName = ?';
      await query(con, sql, [lessName, lessDesc, data, LessLang, OrigLessName]);
      sql = 'UPDATE chapters SET lessName = ? WHERE lessName = ?';
      await query(con, sql, [lessName, OrigLessName]);

      console.log('Lesson edited successfully with image');
      return res.status(201).json({ message: 'Lesson added successfully with image' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err });
  }
});

app.post("/edit_chapter", upload.single('ChapImg'), async (req, res) => {
  const { ChapName, ChapDesc, LessName, OrigChapName } = req.body;

  try {
    if (!req.file) {

      let sql = 'UPDATE chapters SET ChapName = ?, ChapDesc = ?, LessName = ? WHERE ChapName = ?';
      await query(con, sql, [ChapName, ChapDesc, LessName, OrigChapName]);
      sql = 'UPDATE lessons_questions SET ChapName = ? WHERE ChapName = ?';
      await query(con, sql, [ChapName, OrigChapName]);
      console.log('Chapter edited successfully without image');
      return res.status(201).json({ message: 'Chapter edited successfully without image' });
    } else {
      const ChapImgPath = "\\eReader\\Uploads\\" + req.file.filename;
      const data = await fs.promises.readFile(ChapImgPath);

      let sql = 'UPDATE chapters SET ChapName = ?, ChapDesc = ?, ChapImg = ?,  LessName = ? WHERE ChapName = ?';
      await query(con, sql, [ChapName, ChapDesc, data, LessName, OrigChapName]);
      sql = 'UPDATE lessons_questions SET ChapName = ? WHERE ChapName = ?';
      await query(con, sql, [ChapName, OrigChapName]);

      console.log('Chapter edited successfully with image');
      return res.status(201).json({ message: 'Chapter edited successfully with image' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err });
  }
});


app.post("/edit_chapter_question", upload.fields([{ name: 'QuestCard' }, { name: 'QuestAud' }]), async (req, res) => {
  const { ChapName, QuestAns, OrigQuestAns } = req.body;

  try {
    if (!req.files || (!req.files.QuestCard && !req.files.QuestAud)) {

      const sql = 'UPDATE lessons_questions SET ChapName = ?, QuestAns =? WHERE QuestAns = ?';
      await query(con, sql, [ChapName, QuestAns, OrigQuestAns]);
      console.log('Question edited successfully without files');
      return res.status(201).json({ message: 'Question edited successfully without files' });
    } else {

      if (req.files.QuestCard) {
        AssImgPath = "\\eReader\\Uploads\\" + req.files.QuestCard[0].filename;
        ImgData = await fs.promises.readFile(AssImgPath);
        const sql = 'UPDATE lessons_questions SET ChapName = ?, QuestCard = ?, QuestAns = ? WHERE QuestAns = ?';
        await query(con, sql, [ChapName, ImgData, QuestAns, OrigQuestAns]);
      }
  
      if (req.files.QuestAud) {
        AssAudPath = "\\eReader\\Uploads\\" + req.files.QuestAud[0].filename;
        AudData = await fs.promises.readFile(AssAudPath);
        const sql = 'UPDATE lessons_questions SET ChapName = ?, QuestAns =?,  QuestAud = ? WHERE QuestAns = ?';
        await query(con, sql, [ChapName, QuestAns, AudData, OrigQuestAns]);
      }

      if (req.files.QuestCard && req.files.QuestAud) {

      AssImgPath = "\\eReader\\Uploads\\" + req.files.QuestCard[0].filename;
      ImgData = await fs.promises.readFile(AssImgPath);

      AssAudPath = "\\eReader\\Uploads\\" + req.files.QuestAud[0].filename;
      AudData = await fs.promises.readFile(AssAudPath);
      const sql = 'UPDATE lessons_questions SET ChapName = ?, QuestCard = ?, QuestAns =?,  QuestAud = ?  WHERE QuestAns = ?';
      await query(con, sql, [ChapName, ImgData, QuestAns, AudData, OrigQuestAns]);

      }

      console.log('Question edited successfully with video');
      return res.status(201).json({ message: 'Question edited successfully with files' });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err });
  }
});

//Deletion Functions
app.post("/delete_assessment", async (req, res) => {
  const { AssName } = req.body;

  try {
    console.log(AssName)
      const sql = 'DELETE FROM assessments where AssName = ?';
      await query(con, sql, [AssName]);
      console.log('Assessment Deleted successfully');
      return res.status(201).json({ message: 'Assessment Deleted successfully'});
  }

 catch (err) {
  console.error('Error:', err);
  return res.status(500).json({ message: 'Failed to process request', error: err });
}
});

app.post("/delete_assessment_question", async (req, res) => {
  const { Quest } = req.body;

  try {
      const sql = 'DELETE FROM ass_questions where Quest = ?';
      await query(con, sql, [Quest]);
      console.log('Assessment Question Deleted successfully');
      return res.status(201).json({ message: 'Assessment Question Deleted successfully'});
  }

 catch (err) {
  console.error('Error:', err);
  return res.status(500).json({ message: 'Failed to process request', error: err });
}
});

app.post("/delete_lesson", async (req, res) => {
  const { lessName } = req.body;

  try {
      const sql = 'DELETE FROM lessons where lessName = ?';
      await query(con, sql, [lessName]);
      console.log('Lesson Deleted successfully');
      return res.status(201).json({ message: 'Lesson Deleted successfully'});
  }

 catch (err) {
  console.error('Error:', err);
  return res.status(500).json({ message: 'Failed to process request', error: err });
}
});

app.post("/delete_chapter", async (req, res) => {
  const { ChapName } = req.body;

  try {
      const sql = 'DELETE FROM chapters where ChapName = ?';
      await query(con, sql, [ChapName]);
      console.log('Chapter Deleted successfully');
      return res.status(201).json({ message: 'Chapter Deleted successfully'});
  }

 catch (err) {
  console.error('Error:', err);
  return res.status(500).json({ message: 'Failed to process request', error: err });
}
});

app.post("/delete_chapter_question", async (req, res) => {
  const { QuestAns } = req.body;

  try {
      const sql = 'DELETE FROM lessons_questions where QuestAns = ?';
      await query(con, sql, [QuestAns]);
      console.log('Lesson Question Deleted successfully');
      return res.status(201).json({ message: 'Lesson Question Deleted successfully'});
  }

 catch (err) {
  console.error('Error:', err);
  return res.status(500).json({ message: 'Failed to process request', error: err });
}
});


{/* Until Here */}

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

