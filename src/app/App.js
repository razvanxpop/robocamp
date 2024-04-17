import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import AddRobotButton from '../components/AddRobotButton';
import CardList from '../components/CardList';
import DeleteButton from '../components/DeleteButton';
import EmailInput from '../components/EmailInput';
import ExportDataButton from '../components/ExportDataButton';
import NameInput from '../components/NameInput';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import UpdateButton from '../components/UpdateButton';
import ViewRobotsButton from '../components/ViewRobotsButton';
import { useRobotStore } from '../state/robot-store';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState("")
  const [viewRobots, setViewRobots] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [checkedRobots, setCheckedRobots] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [serverDown, setServerDown] = useState(false)

  const { robots, createRobot, updateRobot, deleteRobot } = useRobotStore()

  useEffect(() => {
    const saveState = JSON.parse(localStorage.getItem('state'))
    if(saveState){
      setSearchField(saveState.searchField)
      setViewRobots(saveState.viewRobots)
      setNameInput(saveState.nameInput)
      setEmailInput(saveState.emailInput)
      setCheckedRobots(saveState.checkedRobots)
      setErrorMessage(saveState.errorMessage)
      setServerDown(saveState.serverDown)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify({
      searchField,
      viewRobots,
      nameInput,
      emailInput,
      checkedRobots,
      errorMessage,
      serverDown
    }))
  }, [searchField, viewRobots, nameInput, emailInput, checkedRobots, errorMessage, serverDown]);

  const connection = async () => {
    const ws = new WebSocket("ws://localhost:8081/");
    await axios.get('http://localhost:8080/api/robots')
      .then(response => {
        response.data.forEach(robot => {
          createRobot(robot)
          ws.onmessage = (robot) => {
            console.log('Message from server', robot);
          }
        })
        
        setErrorMessage("")
        setServerDown(false)
      })
      .catch(err => {
        setErrorMessage("The server is unavailable, waiting for the server to render. Update every 5 seconds!")
        setServerDown(true)

        setTimeout(connection, 5000)
      })
  };

  useEffect(() => {
    connection();
  }, []);

  const onAddRobot = async () => {
    if(!validator.isEmail(emailInput) || nameInput.length < 5){
      alert("The email is not valid or the name of the user is too short")
      setEmailInput("")
      setNameInput("")
      return ;
    }

    await axios.post('http://localhost:8080/api/robots', { name: nameInput, email: emailInput })
      .then(response => createRobot(response.data))
      .catch(err => alert(err.response.data.message))

      setEmailInput("")
      setNameInput("")
  };

  const onDeleteRobot = async () => {
    if(!validator.isEmail(emailInput)){
      alert("The email of the user is not valid!");
      setEmailInput("")
      setNameInput("")
      return ;
    }

    let id;
    let robot;
    robots.forEach(r => {
      if(r.email.toLowerCase() === emailInput.toLowerCase()){
          id = r.id;
          robot = r
      }
    })

    if(!robot) {
      alert("The email is not found!")
      setEmailInput("")
      setNameInput("")
      return ;
    }

    await axios.delete(`http://localhost:8080/api/robots/${id}`)
      .then(response => deleteRobot(robot))
      .catch(err => alert(err.response.data.message))

    setEmailInput("")
    setNameInput("")
  };

  const onDeleteRobotEntity = async (robot) => {
    await axios.delete(`http://localhost:8080/api/robots/${robot.id}`)
      .then(response => deleteRobot(robot))
      .catch(err => alert(err.response.data.message))
  };

  const onUpdateRobot = async () => {
    if(!validator.isEmail(emailInput) || nameInput.length < 5){
      alert("The email of the user is not valid or the name is too short!");
      setEmailInput("")
      setNameInput("")
      return ;
    }

    let updatedRobot;
    robots.forEach(robot => {
      if(robot.email.toLowerCase() === emailInput.toLowerCase()){
        updatedRobot = {
          "id": robot.id,
          "name": nameInput,
          "email": emailInput
        }
      }
    })

    if(!updatedRobot){
      alert("There is no user in the database with the provided email address!");
      setEmailInput("")
      setNameInput("")
      return ;
    }

    await axios.patch(`http://localhost:8080/api/robots/${updatedRobot.id}`, updatedRobot)
      .then(response => updateRobot(updatedRobot))
      .catch(err => alert(err.response.data.message))

    setEmailInput("")
    setNameInput("")
  };

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }

  const onViewRobotsChange = () => {
    if(viewRobots === false)
      setViewRobots(true)
    else
      setViewRobots(false)
  }

  const onNameChange = (event) => {
    setNameInput(event.target.value);
  }

  const onEmailChange = (event) => {
    setEmailInput(event.target.value)
  }

  const exportData = (data, fileName, type) => {
    const blob = new Blob([data], {type});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };  

  const onExportDataClick = () => {
    const jsonData = JSON.stringify(robots);
    exportData(jsonData, 'robots.json', 'application/json');
  }

  const onDeleteCheckedRobotsClick = () => {
    checkedRobots.forEach(robot => onDeleteRobotEntity(robot))
    setCheckedRobots([]); 
  }

  const onCheckboxChange = (id) => {
    const updateCheckedRobots = checkedRobots.includes(id) ? checkedRobots.filter(checkedId => checkedId !== id) : [...checkedRobots, id];
    setCheckedRobots(updateCheckedRobots);
  }

  return(
    serverDown ?
    (
      <p className="w-90 ba br2 pa3 ma2 red bg-washed-red" role="alert">
        <strong>Oops!</strong>
        {errorMessage}
      </p>
    )
      :
    (
      viewRobots ?
      (
        <div className='tc'>
          <h1>Robots-World</h1>
          <SearchBox searchChange={onSearchChange}/>
          <button className='white b pv2 ph3 bg-gray hover-bg-mid-gray bn br-pill' onClick={onViewRobotsChange}>Go back</button>
          <button className='white b pv2 ph3 bg-gray hover-bg-mid-gray bn br-pill' onClick={onDeleteCheckedRobotsClick}>Delete Checked</button>
          <Scroll>
            <CardList robots={robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()))} checkboxChange={onCheckboxChange}/>
          </Scroll>
        </div>
      )
        :
      (
        <div className='tc pt6'>
          <NameInput nameChange={onNameChange}/>
          <EmailInput emailChange={onEmailChange}/>
          <AddRobotButton addRobot={onAddRobot}/>
          <DeleteButton deleteRobot={onDeleteRobot}/>
          <UpdateButton updateRobot={onUpdateRobot}/>
          <ViewRobotsButton viewRobotsChange={onViewRobotsChange}/>
          <ExportDataButton exportData={onExportDataClick}/>
        </div>
      )
    )
  )
}

export default App;

// TODO Minimize the code by creating a new component for the form and the list of robots
// TODO Render the tasks for each robot in the Robots component