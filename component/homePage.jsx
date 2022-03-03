import DailyTasks from "./dailyTasks.";
import Profile from "./profile";

function HomePage(){
  return(
    <div>
      <section>
        <DailyTasks/>
      </section>
      <hr />
      <hr />
      <section>
        <Profile/>
      </section>
    </div>
  )
}
export default HomePage;