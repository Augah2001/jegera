import ReactMapboxGl, { Layer, Feature, Marker} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import dheni from "./assets/dheni.jpg";
import './beepingButton.css'


const MyMap = () => {
  
  const Map = ReactMapboxGl({
    accessToken:
    "pk.eyJ1IjoiYXVnYWgiLCJhIjoiY2x0a2pidTFiMGZnbDJrb2VzcnZ6YTJ5biJ9.ulIIDJl3rnwWq8iGBzre5Q",
  });

  return (
    <Map
    center={[31.05139, -17.78421]}
    zoom={[12]}
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: '100vh',
    width: '100vw'
  }}
>
<Marker
  coordinates={[31.05139, -17.78421]}
  >
  <button className="marker-btn fas fa-star">marker</button>
</Marker>
</Map>)}
  

export default MyMap;
