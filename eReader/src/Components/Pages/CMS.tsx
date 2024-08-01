import { useState } from "react";
import { Form, Row, Image} from "react-bootstrap";
import {Button, ThemeProvider} from "react-bootstrap";
import RecAudio from '../Images/RecordedAudio.png'

const CMS = ({}) => {
  const [Language, setLanguage] = useState('X');
  const [Type, setType] = useState('X');
  const [lessonChoice, setLessonChoice] = useState<any>('X');
  const [chapChoice, setChapChoice] = useState<any>('X');
  const [chapQuest , setChapQuest] = useState<any>('X');
  const [assessmentChoice, setAssessmentChoice] = useState('X');
  const [assQuest , setAssQuest] = useState<any>('X');
  const [fetchType, setFetchType] = useState<any[]>([]);
  const [fetchChap, setFetchChap] = useState<any[]>([]);
  const [fetchChapQuest, setFetchChapQuest] = useState<any[]>([]);
  const [fetchAssQuest, setFetchAssQuest] = useState<any[]>([]);
  const [newAssDetails, setNewAssDetails] = useState<any[]>([]);
  const [newAssQuestDetails, setNewAssQuestsDetails] = useState<any[]>([]);
  const [newLessDetails, setNewLessDetails] = useState<any[]>([]);
  const [newChapDetails, setNewChapDetails] = useState<any[]>([]);
  const [newChapQuestDetails, setNewChapQuestDetails] = useState<any[]>([]);

  const resetChoice = (reset) => {
    if (reset == "Language") {
      setType('X');
      setLessonChoice('X');
      setChapChoice('X');
      setChapQuest('X');
      setAssessmentChoice('X');
      setAssQuest('X');
    }

    if (reset == "Type") {
      setLessonChoice('X');
      setChapChoice('X');
      setChapQuest('X');
      setAssessmentChoice('X');
      setAssQuest('X');
    }

    if (reset == "Assessment") {
      setLessonChoice('X');
      setChapChoice('X');
      setChapQuest('X');
      setAssQuest('X');
    }

    if (reset == "Lesson") {
      setChapChoice('X');
      setAssessmentChoice('X');
      setChapQuest('X');
      setAssQuest('X');
    }

    if (reset == "Chapter") {
      setChapQuest('X');
      setAssessmentChoice('X');
      setAssQuest('X');
    }
  }

  const handleSubmit = async (reset, fetch, postSetter, request) => {
    await fetchData(fetch, postSetter, request)
    resetChoice(reset)  
  }

  const fetchData = async (Query, postSetter, request) => {

    try {
      let requestData = {};

    if (Query == "lessons" || Query == "assessments"){
        requestData = {
          Language: request,
        }}

    if (Query == "chapters"){
        requestData = {
          LessName: request,
        }}

    if (Query == "lesson_questions"){
        requestData = {
          ChapName: request,
        }}
    
    if (Query == "assessment_questions"){
        requestData = {
          AssName: request,
        }}
    
        const response = await fetch('http://127.0.0.1:8000/' + Query, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData),
        });
        
    const jsonData = await response.json();
    postSetter(jsonData.message);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const newData = async (Query, request) => {

  try {
    const formData = new FormData();

  if (Query == "assessment")  {
    formData.append('AssName', request[0]);
    formData.append('AssDesc', request[1]);
    formData.append('AssImg', request[2]);
    formData.append('AssLang', Language);
  }

  if (Query == "assessment_question")  {
    console.log(request);
    formData.append('Quest', request[0]);
    formData.append('AssAns', request[1]);
    formData.append('AssImg', request[2]);
    formData.append('AssAud', request[3]);
    formData.append('AssName', fetchType[assessmentChoice].AssName);
  }

  if (Query == "lesson")  {
    formData.append('lessName', request[0]);
    formData.append('lessDesc', request[1]);
    formData.append('LessImg', request[2]);
    formData.append('LessLang', Language);
  }

  if (Query == "chapter")  {
    formData.append('ChapName', request[0]);
    formData.append('ChapDesc', request[1]);
    formData.append('ChapImg', request[2]);
    formData.append('LessName', fetchType[lessonChoice].lessName);
  }

  if (Query == "chapter_question")  {
    formData.append('ChapName', fetchChap[chapChoice].ChapName);
    formData.append('QuestAns', request[0]);
    formData.append('QuestCard', request[1]);
    formData.append('QuestAud', request[2]);
  }
  
      await fetch('http://127.0.0.1:8000/new_' + Query, {
        method: 'POST',
        body: formData,
      });
      
} catch (error) {
  console.error('Error fetching data:', error);
}
};

const editData = async (Query, request) => {

  try {
    const formData = new FormData();

  if (Query == "assessment")  {
    formData.append('AssName', request[0]);
    formData.append('AssDesc', request[1]);
    formData.append('AssImg', request[2]);
    formData.append('AssLang', Language);
    formData.append('OrigAssName', fetchType[assessmentChoice].AssName);
  }

  if (Query == "assessment_question")  {
    formData.append('Quest', request[0]);
    formData.append('AssAns', request[1]);
    formData.append('AssImg', request[2]);
    formData.append('AssAud', request[3]);
    formData.append('AssName', request[4]);
    formData.append('OrigQuest', fetchAssQuest[assQuest].Quest);
  }

  if (Query == "lesson")  {
    formData.append('lessName', request[0]);
    formData.append('lessDesc', request[1]);
    formData.append('LessImg', request[2]);
    formData.append('LessLang', Language);
    formData.append('OrigLessName', fetchType[lessonChoice].lessName);
  }

  if (Query == "chapter")  {
    formData.append('ChapName', request[0]);
    formData.append('ChapDesc', request[1]);
    formData.append('ChapImg', request[2]);
    formData.append('LessName', request[3]);
    formData.append('OrigChapName', fetchChap[chapChoice].ChapName);
  }

  if (Query == "chapter_question")  {
    formData.append('ChapName', request[0]);
    formData.append('QuestAns', request[2]);
    formData.append('QuestCard', request[1]);
    formData.append('QuestAud', request[3]);
    formData.append('OrigQuestAns', fetchChapQuest[chapQuest].QuestAns )
  }
  
      await fetch('http://127.0.0.1:8000/edit_' + Query, {
        method: 'POST',
        body: formData,
      });
      
} catch (error) {
  console.error('Error fetching data:', error);
}
};

const deleteData = async (Query) => {

  try {
    let requestData = {};

  if ( Query == "assessment"){
      requestData = {
        AssName: fetchType[assessmentChoice].AssName,
      }}

  if (Query == "assessment_question")  {
      requestData = {
        Quest: fetchAssQuest[assQuest].Quest,
      }}

  if (Query == "lesson")  {
    requestData = {
      lessName: fetchType[lessonChoice].lessName,
    }}

  if (Query == "chapter")  {
    requestData = {
      ChapName: fetchChap[chapChoice].ChapName,
    }}

  if (Query == "chapter_question")  {
    requestData = {
      QuestAns: fetchChapQuest[chapQuest].QuestAns,
    }}
  
      await fetch('http://127.0.0.1:8000/delete_' + Query, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
      });
      
} catch (error) {
  console.error('Error fetching data:', error);
}
};

const addToArray = (index, eventValue, array, arraySetter) => {
  const updatedDetails = [...array];
  updatedDetails[index] = eventValue;
  arraySetter(updatedDetails);
};

const setArray = (getArray, arraySetter) => {
  var updatedDetails = Object.values(getArray);
  arraySetter(updatedDetails);
};

const loadObject = (element, urlString ) => {
  const CHUNK_SIZE = 0x8000;
  const byteCharacters = [];
  const array = new Uint16Array(element);

  for (let offset = 0; offset < array.byteLength; offset += CHUNK_SIZE){
    const chunk = array.slice(offset, offset + CHUNK_SIZE);
    byteCharacters.push(String.fromCharCode.apply(null, chunk));
  }

  const blobBTOA = btoa(byteCharacters.join(''));
  const url = `${urlString},${blobBTOA}`;
  return(url)
}

const start = async (element) => {

  const CHUNK_SIZE = 0x8000;
  const byteCharacters = [];
  const array = new Uint16Array(element);

  for (let offset = 0; offset < array.byteLength; offset += CHUNK_SIZE){
    const chunk = array.slice(offset, offset + CHUNK_SIZE);
    byteCharacters.push(String.fromCharCode.apply(null, chunk));
  }

  const blobBTOA = btoa(byteCharacters.join(''));
  const url = `data:audio/mp3;base64,${blobBTOA}`;
  const audio = new Audio(url)
  audio.load()
  audio.play()
}


  return (
  <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs"
  >
    <>
      <Row>
        <h1 className='text-dark' style={{fontSize: '100px', width: '1200px',  textAlign: 'center'}}>CMS DASHBOARD</h1>
      </Row>
      {/*Language Choice*/}
      <Form>
        <Form.Label>Language</Form.Label>
        <Form.Select aria-label="Language" onChange={(e) => {setLanguage(e.target.value); resetChoice("Language")}}>
          <option>Open this select menu</option>
          <option value="English">English</option>
          <option value="Tagalog">Tagalog</option>
        </Form.Select>
      </Form>
      {/*Lesson or Assessment Choice*/}
      {Language !== 'X' && 
      <>
        <Form>
          <Form.Label>Type</Form.Label>
          <Form.Select aria-label="Language" onChange={(e) => {setType(e.target.value); fetchData(e.target.value, setFetchType, Language); resetChoice("Type")}}>
            <option value = "X">Open this select menu</option>
            <option value="lessons">Lesson</option>
            <option value="assessments">Assessment</option>
          </Form.Select>
        </Form>

          {Type === 'assessments' && 
            <>
              {/*assessments*/}
              <Form>
                <Form.Label>Assessments</Form.Label>
              <Form.Select aria-label="Language" onChange={(e) => {setAssessmentChoice(e.target.value); fetchData("assessment_questions", setFetchAssQuest, fetchType[e.target.value].AssName); 
                setArray(fetchType[e.target.value], setNewAssDetails); resetChoice("Assessment")}}>
                  <option value = "X">Open this select menu</option>
                  {fetchType.map((item: any, index: number) =>
                    <option value={index}>{item.AssName}</option>)}
                  <option value = "New">New Assessment</option>
                </Form.Select>
              </Form>

                {/*New Assessment*/}
                {assessmentChoice === "New" &&
                  <>
                    <Form>
                      <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                        <Form.Label>Assessment Name</Form.Label> 
                        <Form.Control placeholder='Assessment Name' onChange={(e) => addToArray(0, e.target.value, newAssDetails, setNewAssDetails)}></Form.Control>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='LessDesc.ControlInput'>
                        <Form.Label>Assessment Description</Form.Label>
                        <Form.Control placeholder='Assessment Description' onChange={(e) => addToArray(1, e.target.value, newAssDetails, setNewAssDetails)}></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Thumbnail</Form.Label>
                        <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(2, e.target.files?.[0], newAssDetails, setNewAssDetails)}/>
                      </Form.Group>
                      <Button size='lg' variant='success' style={{position: 'relative', left: '46%'}} onClick={() => {newData("assessment", newAssDetails); handleSubmit("Language", 
                      "assessments", setFetchType, Language)}}>Submit</Button>
                    </Form>
                  </>
                }

                {/*Edit Chosen Assessment */}
                {assessmentChoice !== 'X' && assessmentChoice !== "New" && 
                  <>
                    <Form>
                      <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                        <Form.Label>Assessment Name</Form.Label>
                        <Form.Control defaultValue={fetchType[assessmentChoice].AssName} onChange={(e) => {addToArray(0, e.target.value, newAssDetails, setNewAssDetails)}}></Form.Control>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='LessDesc.ControlInput'>
                        <Form.Label>Assessment Description</Form.Label>
                        <Form.Control defaultValue={fetchType[assessmentChoice].AssDesc} onChange={(e) => addToArray(1, e.target.value, newAssDetails, setNewAssDetails)}></Form.Control>
                      </Form.Group>
                      <Image src={loadObject(fetchType[assessmentChoice].AssImg.data, "data:image/png;base64")} style={{width: '30rem'}}></Image>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Change Thumbnail</Form.Label>
                        <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(2, e.target.files?.[0], newAssDetails, setNewAssDetails)}/>
                      </Form.Group>
                      <Button size='lg' variant='danger' style={{position: 'relative', left: '40%'}} onClick={() => {deleteData("assessment");handleSubmit("Language", 
                      "assessments", setFetchType, Language)}}>Delete</Button>
                      <Button size='lg' variant='success' style={{position: 'relative', left: '50%'}} onClick={() => {editData("assessment", newAssDetails);handleSubmit("Language", 
                      "assessments", setFetchType, Language)}}>Submit</Button>
                    </Form>

                    {/*Assessment Questions*/}
                    <Form>
                        <Form.Label>Choose Question</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => {setAssQuest(e.target.value); setArray(fetchAssQuest[e.target.value], setNewAssQuestsDetails)}}>
                          <option value = "X">Open this select menu</option>
                          {fetchAssQuest.map((item: any, index: number) =>
                            <option value={index}>{item.Quest}</option>)}
                          <option value = "New">New Question</option>
                        </Form.Select>
                    </Form>

                      {/* New Asessment Question */}
                      {assQuest === "New" && 
                        <>
                          <Form>
                              <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                                <Form.Label>Question</Form.Label>
                                <Form.Control placeholder='Question' onChange={(e) => addToArray(0, e.target.value, newAssQuestDetails, setNewAssQuestsDetails)}></Form.Control>
                              </Form.Group>
                              <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                                <Form.Label>Answer</Form.Label>
                                <Form.Control placeholder='Answer' onChange={(e) => addToArray(1, e.target.value, newAssQuestDetails, setNewAssQuestsDetails)}></Form.Control>
                              </Form.Group>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(2, e.target.files?.[0], newAssQuestDetails, setNewAssQuestsDetails)}/>
                              </Form.Group>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload Audio</Form.Label>
                                <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(3, e.target.files?.[0], newAssQuestDetails, setNewAssQuestsDetails)}/>
                              </Form.Group>
                            <Button size='lg' variant='success' style={{position: 'relative', left: '46%'}} onClick={() => {newData("assessment_question", newAssQuestDetails);handleSubmit("Type", 
                      "assessment_questions", setAssQuest, fetchType[assessmentChoice].AssName)}}>Submit</Button>
                          </Form>
                        </>
                      }

                      {/*Edit Chosen Assessment Question */}
                      {assQuest !== 'X' && assQuest !== "New" && 
                      <>
                        <Form>
                            <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                              <Form.Label>Question</Form.Label>
                              <Form.Control defaultValue={fetchAssQuest[assQuest].Quest} onChange={(e) => {addToArray(0, e.target.value, newAssQuestDetails, setNewAssQuestsDetails)}}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                              <Form.Label>Answer</Form.Label>
                              <Form.Control defaultValue={fetchAssQuest[assQuest].AssAns} onChange={(e) => {addToArray(1, e.target.value, newAssQuestDetails, setNewAssQuestsDetails)}}></Form.Control>
                            </Form.Group>
                            <Image src={loadObject(fetchAssQuest[assQuest].AssImg.data, "data:image/png;base64")} style={{width: "30rem"}}></Image>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Label>Change Image</Form.Label>
                              <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(2, e.target.files?.[0], newAssQuestDetails, setNewAssQuestsDetails)}/>
                            </Form.Group>
                            <Image src={RecAudio} onClick={() => start(fetchAssQuest[assQuest].AssAud.data)} rounded style={{height: '50px', width:'60px'}}/>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Label>Change Audio</Form.Label>
                              <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(3, e.target.files?.[0], newAssQuestDetails, setNewAssQuestsDetails)}/>
                            </Form.Group>
                            <Button size='lg' variant='danger' style={{position: 'relative', left: '40%'}} onClick={() => {deleteData("assessment_question"); handleSubmit("Type", 
                      "assessment_questions", setAssQuest, fetchType[assessmentChoice].AssName)}}>Delete</Button>
                            <Button size='lg' variant='success' style={{position: 'relative', left: '50%'}} onClick={() => {editData("assessment_question", newAssQuestDetails); handleSubmit("Type", 
                      "assessment_questions", setAssQuest, fetchType[assessmentChoice].AssName)}}>Submit</Button>
                        </Form>
                      </>                      
                      }

                  </>
                }
            </>
          }

          {Type === 'lessons' && 
            <>
              {/*Lessons*/}
              <Form>
                <Form.Label>Lessons</Form.Label>
                <Form.Select aria-label="Language"  onChange={(e) => {setLessonChoice(e.target.value); fetchData("chapters", setFetchChap, fetchType[e.target.value].lessName);
                  setArray(fetchType[e.target.value], setNewLessDetails); resetChoice("Lesson")
                }}>
                  <option value = "X">Open this select menu</option>
                  {fetchType.map((item: any, index: number) => 
                  <option value={index}>{item.lessName}</option> )}
                  <option value = "New">New Lesson</option>
                </Form.Select>
              </Form>

              {lessonChoice === 'New' && 
                <>
                  {/* New Lesson*/}
                  <Form>
                    <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                      <Form.Label>Lesson Name</Form.Label> 
                      <Form.Control placeholder='Lesson Name' onChange={(e) => addToArray(0, e.target.value, newLessDetails, setNewLessDetails)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='LessDesc.ControlInput'>
                      <Form.Label>Lesson Description</Form.Label>
                      <Form.Control placeholder='Lesson Description' onChange={(e) => addToArray(1, e.target.value, newLessDetails, setNewLessDetails)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Thumbnail</Form.Label>
                      <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(2, e.target.files?.[0], newLessDetails, setNewLessDetails)}/>
                    </Form.Group>
                    <Button size='lg' variant='success' style={{position: 'relative', left: '46%'}} onClick={() => {newData("lesson", newLessDetails);handleSubmit("Language", 
                      "lessons", setFetchType, Language)}}>Submit</Button>
                </Form>
                </>
              }

              {lessonChoice !== 'X' && lessonChoice !== 'New' && 
                <>
                  {/*Edit Chosen Lesson*/}
                  <Form>
                    <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                      <Form.Label>Lesson Name</Form.Label>
                      <Form.Control defaultValue={fetchType[lessonChoice].lessName} onChange={(e) => {addToArray(0, e.target.value, newLessDetails, setNewLessDetails)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='LessDesc.ControlInput'>
                      <Form.Label>Lesson Description</Form.Label>
                      <Form.Control defaultValue={fetchType[lessonChoice].lessDesc} onChange={(e) => {addToArray(1, e.target.value, newLessDetails, setNewLessDetails)}}></Form.Control>
                    </Form.Group>
                    <Image src={loadObject(fetchType[lessonChoice].LessImg.data, "data:image/png;base64")} style={{width: '30rem', border: 'solid 1px black'}}></Image>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Change Thumbnail</Form.Label>
                      <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(2, e.target.files?.[0], newLessDetails, setNewLessDetails)}/>
                    </Form.Group>
                    <Button size='lg' variant='danger' style={{position: 'relative', left: '40%'}} onClick={() => {deleteData("lesson"); handleSubmit("Language", 
                      "lessons", setFetchType, Language)}}>Delete</Button>
                    <Button size='lg' variant='success' style={{position: 'relative', left: '50%'}} onClick={() => {editData("lesson", newLessDetails); handleSubmit("Language", 
                      "lessons", setFetchType, Language)}}>Submit</Button>
                </Form>

                {/*Chapters*/}
                <Form>
                  <Form.Label>Choose Chapter</Form.Label>
                  <Form.Select aria-label="Language" onChange={(e) => {setChapChoice(e.target.value); fetchData("lesson_questions", setFetchChapQuest, fetchChap[e.target.value].ChapName);
                    setArray(fetchChap[e.target.value], setNewChapDetails); resetChoice("Chapter")
                  }}>
                    <option value = "X">Open this select menu</option>
                    {fetchChap.map((item: any, index: number) => 
                      <option value={index}>{item.ChapName}</option>)}
                    <option value = "New">New Chapter</option>
                  </Form.Select>
                </Form>
                
                  {/*Edit Chosen Chapter*/}
                  {chapChoice !== 'X' && chapChoice !== "New" && 
                    <>
                    <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                      <Form.Label>Chapter Name</Form.Label>
                      <Form.Control defaultValue={fetchChap[chapChoice].ChapName} onChange={(e) => {addToArray(0, e.target.value, newChapDetails, setNewChapDetails)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='LessDesc.ControlInput'>
                      <Form.Label>Chapter Description</Form.Label>
                      <Form.Control defaultValue={fetchChap[chapChoice].ChapDesc} onChange={(e) => {addToArray(1, e.target.value, newChapDetails, setNewChapDetails)}}></Form.Control>
                    </Form.Group>
                    <Image src={loadObject(fetchChap[chapChoice].ChapImg.data, "data:image/png;base64")} style={{width: '30rem', border: 'solid 1px black'}}></Image>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Change Thumbnail</Form.Label>
                      <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(2, e.target.files?.[0], newChapDetails, setNewChapDetails)}/>
                    </Form.Group>
                    <Button size='lg' variant='danger' style={{position: 'relative', left: '40%'}} onClick={() => {deleteData("chapter"); handleSubmit("Type", 
                      "chapters", setChapChoice, fetchType[lessonChoice].lessName)}}>Delete</Button>
                    <Button size='lg' variant='success' style={{position: 'relative', left: '50%'}} onClick={() => {editData("chapter", newChapDetails); handleSubmit("Type", 
                      "chapters", setChapChoice, fetchType[lessonChoice].lessName)}}>Submit</Button>

                      {/*Chapter Question*/}
                      <Form>
                        <Form.Label>Choose Question</Form.Label>
                        <Form.Select aria-label="Language" onChange={(e) => {setChapQuest(e.target.value); setArray(fetchChapQuest[e.target.value], setNewChapQuestDetails)}}>
                          <option value = "X">Open this select menu</option>
                          {fetchChapQuest.map((item: any, index: number) => 
                            <option value={index}>{item.QuestAns}</option>)}
                          <option value = "New">New Question</option>
                        </Form.Select>
                      </Form>

                        {/*New Chapter Question*/}
                        {chapQuest === "New" && 
                          <>
                            <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                              <Form.Label>Answer</Form.Label>
                              <Form.Control placeholder='Answer' onChange={(e) => addToArray(0, e.target.value, newChapQuestDetails, setNewChapQuestDetails)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload Card</Form.Label>
                                <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(1, e.target.files?.[0], newChapQuestDetails, setNewChapQuestDetails)}/>
                              </Form.Group>
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload Audio</Form.Label>
                                <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(2, e.target.files?.[0], newChapQuestDetails, setNewChapQuestDetails)}/>
                              </Form.Group>
                            <Button size='lg' variant='success' style={{position: 'relative', left: '46%'}} onClick={() => {newData("chapter_question", newChapQuestDetails); handleSubmit("Lesson", 
                      "chapter_question", setChapQuest, fetchChap[chapChoice].ChapName)}}>Submit</Button>
                          </>
                        }

                        {/*Edit Chosen Question */}
                        {chapQuest !== 'X' && chapQuest !== "New" &&
                          <>
                            <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                              <Form.Label>Answer</Form.Label>
                              <Form.Control defaultValue={fetchChapQuest[chapQuest].QuestAns} onChange={(e) => {addToArray(2, e.target.value, newChapQuestDetails, setNewChapQuestDetails)}}></Form.Control>
                            </Form.Group>
                            <Image src={loadObject(fetchChapQuest[chapQuest].QuestCard.data, "data:image/png;base64")} style={{width: "30rem"}}></Image>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Label>Change Image</Form.Label>
                              <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(1, e.target.files?.[0], newChapQuestDetails, setNewChapQuestDetails)}/>
                            </Form.Group>
                            <Image src={RecAudio} onClick={() => start(fetchChapQuest[chapQuest].QuestAud.data)} rounded style={{height: '50px', width:'60px'}}/>
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Label>Change Audio</Form.Label>
                              <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(3, e.target.files?.[0], newChapQuestDetails, setNewChapQuestDetails)}/>
                            </Form.Group>
                            <Button size='lg' variant='danger' style={{position: 'relative', left: '40%'}} onClick={() => {deleteData("chapter_question"); handleSubmit("Lesson", 
                      "chapter_question", setChapQuest, fetchChap[chapChoice].ChapName)}}>Delete</Button>
                            <Button size='lg' variant='success' style={{position: 'relative', left: '50%'}} onClick={() => {editData("chapter_question", newChapQuestDetails); handleSubmit("Lesson", 
                      "chapter_question", setChapQuest, fetchChap[chapChoice].ChapName)}}>Submit</Button>
                          </>
                        }
                    </>
                  }

                  {/*New Chapter*/}
                  {chapChoice === "New" &&
                    <>
                    <Form.Group className='mb-3' controlId='LessName.ControlInput'>
                      <Form.Label>Chapter Name</Form.Label>
                      <Form.Control placeholder='Chapter Name' onChange={(e) => addToArray(0, e.target.value, newChapDetails, setNewChapDetails)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='LessDesc.ControlInput'>
                      <Form.Label>Chapter Description</Form.Label>
                      <Form.Control placeholder='Chapter Description' onChange={(e) => addToArray(1, e.target.value, newChapDetails, setNewChapDetails)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Thumbnail</Form.Label>
                      <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addToArray(2, e.target.files?.[0], newChapDetails, setNewChapDetails)}/>
                    </Form.Group>
                    <Button size='lg' variant='success' style={{position: 'relative', left: '46%'}} onClick={() => {newData("chapter", newChapDetails); handleSubmit("Type", 
                      "chapters", setChapChoice, fetchType[lessonChoice].lessName)}}>Submit</Button>
                    </>
                  }
                </>
              }
            </>
          }
      </>
      }
    </>
</ThemeProvider>
  )
}
  
export default CMS;