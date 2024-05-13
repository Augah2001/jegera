import React from 'react'
import useFetch from './useFetch'
import { User } from '../contexts/UserContext';
import { Location } from './useLocations';
import { LngLatLike } from 'mapbox-gl';


enum Gender {
    Male = "Male",
    Female = "Female",
  }

export interface House {
    id: number;
    locationId: number;
    location: Location
    houseNumber: number;
    street: string;
    description: string;
    price: number;
    minutes: number; // To what point of reference (e.g., from city center)?
    capacity: number;
    occupied: number;
    perRoom: number; // Price per room or total price per stay?
    gender: Gender;
    images: string[];
    backgroundImage: string;
    curfew: number; // Time in 24-hour format (0-23)?

    ownerId: number;
    services: Service[];
    coordinates: LngLatLike
  }

export interface Service {
    id: number;
    name: string;
    houses: House[]
}

const useHouses = () =>  useFetch<House>('/houses')

export default useHouses
