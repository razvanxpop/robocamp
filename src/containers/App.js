import React, { useState, useEffect } from 'react'
import './App.css';
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ViewRobotsButton from '../components/ViewRobotsButton'
import NameInput from '../components/NameInput'
import EmailInput from '../components/EmailInput'
import AddRobotButton from '../components/AddRobotButton'
import validator from 'validator'
import DeleteButton from '../components/DeleteButton'
import UpdateButton from '../components/UpdateButton'



const App = () => {
  const [robots, setRobotsList] = useState([])
  const [searchField, setSearchField] = useState("")
  const [viewRobots, setViewRobots] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('state'))
    if(savedState){
      setRobotsList(savedState.robots)
      setSearchField(savedState.searchField)
      setViewRobots(savedState.viewRobots)
      setNameInput(savedState.nameInput)
      setEmailInput(savedState.emailInput)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify({
      robots,
      searchField,
      viewRobots,
      nameInput,
      emailInput
    }))
  }, [robots, searchField, viewRobots, nameInput, emailInput]);

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

  const onAddRobotClick = () => {
    if(validator.isEmail(emailInput) && nameInput.length >= 5){
      const emailExists = robots.reduce((acc, robot) => {
        return acc || (robot.email === emailInput)
      }, false)
      if(!emailExists){
        setRobotsList([...robots, {
          name: nameInput,
          email: emailInput
        }])
      } else {
        alert("Email already exists in the list!")
      }
    } else {
      alert("Email is not valid or the name provided is too short!")
    }
  }

  const onDeleteRobotClick = () => {
    if(nameInput.length > 0) {
      const filteredRobots = robots.filter(robot => {
        return !robot.name.toLowerCase().includes(nameInput.toLowerCase())
      })
      setRobotsList(filteredRobots);
    } else {
      alert("Please provide a name!")
    }
  }

  const onUpdateRobotClick = () => {
    if(validator.isEmail(emailInput)){
      const emailExists = robots.reduce((acc, robot) => {
        return acc || (robot.email === emailInput)
      }, false)
      if(!emailExists){
        setRobotsList(robots.map(robot => {
          if(robot.name.toLowerCase() === nameInput.toLowerCase()){
            return { ...robot, email: emailInput }
          }
          return robot;
        }))
      } else {
        alert("The provided email already exists!")
      }
    } else {
      alert("The email is not valid!")
    }
  }

  return(
    viewRobots ?
    (
      <div className='tc'>
        <h1>Robots-World</h1>
        <SearchBox searchChange={onSearchChange}/>
        <button className='white b pv2 ph3 bg-gray hover-bg-mid-gray bn br-pill' onClick={onViewRobotsChange}>Go back</button>
        <Scroll>
          <CardList robots={robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()))} />
        </Scroll>
      </div>
      )
      :
      (
      <div className='tc pt6'>
        <NameInput nameChange={onNameChange}/>
        <EmailInput emailChange={onEmailChange}/>
        <AddRobotButton addRobot={onAddRobotClick}/>
        <DeleteButton deleteRobot={onDeleteRobotClick}/>
        <UpdateButton updateRobot={onUpdateRobotClick}/>
        <ViewRobotsButton viewRobotsChange={onViewRobotsChange}/>
      </div>
      )
  )
}

// class App extends Component {
//   constructor() {
//     super()
//     this.state = {
//       robots: [],
//       searchfield: "",
//       viewrobots: 0,
//       nameinput: "",
//       emailinput: ""
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(users => this.setState({robots: users}));
//   }

//   onSearchChange = (event) => {
//     this.setState({searchfield: event.target.value})
//   }

//   onViewRobotsChange = () => {
//     this.setState({viewrobots: 1})
//   }

//   onNameChange = (event) => {
//     this.setState({ nameinput: event.target.value})
//   }

//   onEmailChange = (event) => {
//     this.setState({ emailinput: event.target.value })
//   }

//   onAddRobotClick = () => {
//     if(validator.isEmail(this.state.emailinput) && this.state.nameinput.length >= 5){
//       this.setState({robots: [...this.state.robots, 
//         {
//           "id": 123,
//           "name": this.state.nameinput,
//           "username": "12313",
//           "email": this.state.emailinput,
//           "address": {
//             "street": "Kulas Light",
//             "suite": "Apt. 556",
//             "city": "Gwenborough",
//             "zipcode": "92998-3874",
//             "geo": {
//               "lat": "-37.3159",
//               "lng": "81.1496"
//             }
//           },
//           "phone": "none",
//           "website": "hildegard.org",
//           "company": {
//             "name": "AI-SOFT",
//             "catchPhrase": "none",
//             "bs": "none"
//           }
//         }
//       ]})
//     }
//   }

//   onDeleteRobotClick = () => {
//     if(this.state.nameinput.length > 0){
//       const filteredRobots = this.state.robots.filter(robot => {
//         return !robot.name.toLowerCase().includes(this.state.nameinput.toLowerCase())
//       })
//       this.setState({robots: filteredRobots})
//     }
//   }

//   onUpdateRobotClick = () => {
//     if(validator.isEmail(this.state.emailinput)){
//       this.setState({robots: this.state.robots.map(robot => {
//         if(robot.name.toLowerCase() === this.state.nameinput.toLowerCase())
//           robot.email = this.state.emailinput
//         return robot
//       })})
//     }
//   }

//   onStateChange = () => {
//     useEffect(() => {
//       localStorage.setItem("state", JSON.stringify(this.state))
//     });
//   }

//   render() {
//     const { robots, searchfield, viewrobots } = this.state
//     console.log(robots, "render")
//     const filteredRobots = robots.filter(robot => {
//       return robot.name.toLowerCase().includes(searchfield.toLowerCase())
//     })
//     this.onStateChange();
//     return viewrobots ?
//       <div className='tc'>
//         <h1>Robots-World</h1>
//         <SearchBox searchChange={this.onSearchChange}/>
//         <Scroll>
//           <CardList robots={filteredRobots} />
//         </Scroll>
//       </div>
//       :
//       <div className='tc pt6'>
//         <NameInput nameChange={this.onNameChange}/>
//         <EmailInput emailChange={this.onEmailChange}/>
//         <AddRobotButton addRobot={this.onAddRobotClick}/>
//         <DeleteButton deleteRobot={this.onDeleteRobotClick}/>
//         <UpdateButton updateRobot={this.onUpdateRobotClick}/>
//         <ViewRobotsButton viewRobotsChange={this.onViewRobotsChange}/>
//       </div>
//   }
// }

export default App;
