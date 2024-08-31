import './App.css';
import FullName from './components/UserInformation/FullName/FullName';
import Section from './components/UserInformation/Section/Section';
import AboutMe from './components/UserInformation/AboutMe/AboutMe';
import { useState } from 'react';

function App() {
  const [isAtTop, setIsAtTop] = useState(false);
  const [isSun, setIsSun] = useState(false); 

  const [userInformation, setUserInformation] = useState({
    firstName: "Jan Lancelot P. Mailig",
    middleInitial: "P.",
    lastName: "Mailig",
    section: "BSCS-3A",
    description: "I like writing, reading, and programming. At this moment, ",
  });

  function updateName() {
    console.log("Before: ", userInformation.firstName);

    userInformation.firstName = "Lem";
    setUserInformation({ ...userInformation });

    console.log("After:", userInformation.firstName);
  }

  function toggleMoonSun() {
    setIsAtTop(!isAtTop);
    setIsSun(!isSun);
  }

  return (
    <div className="App">
      <FullName
        firstName={userInformation.firstName}
        middleInitial={userInformation.middleInitial}
        lastName={userInformation.lastName}
      />
      <Section section={userInformation.section} />
      <AboutMe description={userInformation.description} />

      <div
        className={`celestial-body ${isAtTop ? 'move-up' : 'move-down'} ${isSun ? 'sun' : 'moon'}`}
      ></div>

      <button type='button' onClick={updateName}>Update Name</button>
      <button type='button' onClick={toggleMoonSun}>
        {isAtTop ? (isSun ? 'Set Sun Down' : 'Set Moon Down') : (isSun ? 'Rise Sun' : 'Rise Moon')}
      </button>
    </div>
  );
}

export default App;
