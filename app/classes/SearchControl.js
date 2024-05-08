import { createRoot } from "react-dom/client";
import MapSearchComponent from "../components/MapSearchBox";

class HelloWorldControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div')
        this.root = createRoot(this._container)
        this.root.render(<MapSearchComponent/>)
        
        
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

export default HelloWorldControl