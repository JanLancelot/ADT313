import FullName from "./FullName/FullName";
import Section from "./Section/Section";
import AboutMe from "./AboutMe/AboutMe";

function UserInformation() {
    return (
        <div className="">
            <FullName />
            <Section />
            <AboutMe />
        </div>
    )
}

export default UserInformation;