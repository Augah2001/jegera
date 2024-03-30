import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  // Similar to the previous code, define your GeoJSON data
  const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'message': 'Foo',
                'imageId': 1011,
                'iconSize': [60, 60]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [ 31.057944274364743, -17.784130655572376]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Bar',
                'imageId': 870,
                'iconSize': [50, 50]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-61.21582, -15.971891]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Baz',
                'imageId': 837,
                'iconSize': [40, 40]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-63.292236, -18.281518]
            }
        }
    ]
};


  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiYXVnYWgiLCJhIjoiY2x0a2pidTFiMGZnbDJrb2VzcnZ6YTJ5biJ9.ulIIDJl3rnwWq8iGBzre5Q',
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12', // Choose your Mapbox style
      center: [ 31.056066728099662, -17.78114751541243],
      zoom: 15

    });

    // Add source for markers (similar to previous code)
    map.on('load', () => {
      // Add source for markers after the map loads
      map.addSource('markers', {
        type: 'geojson',
        data: geojson
      })
    
      map.addLayer({
        id: 'markers',
        type: 'symbol',
        source: 'markers',
        layout: {
          'icon-image': '{imageId}', // Use property from GeoJSON
          'icon-size': ['get', 'iconSize'] // Use property from GeoJSON
        },
        paint: {
          'icon-color': '#ffffff' // Optional: set marker color
        }
      });
    });

    // Add symbol layer for markers
    

    // Function to handle marker clicks (similar to previous code)
    const handleMarkerClick = (e:any) => {
      const clickedFeature = e.features[0];
      if (clickedFeature) {
        window.alert(clickedFeature.properties.message);
      }
    };

    // Add click event listener for markers
    map.on('click', 'markers', handleMarkerClick);

    // Clean up map on component unmount
    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainerRef} className='h-screen'/>
  );
};

export default MapComponent;
