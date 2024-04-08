
import Homepage from "./components/Homepage";
import "./App.css";


const App = () => {
  return ( 
    // added a class "content" to apply a maxwidth to it in App.css. this is centering all the contents on the page
    <div className="content">
      <Homepage/>
    </div>
   );
}
 
export default App;