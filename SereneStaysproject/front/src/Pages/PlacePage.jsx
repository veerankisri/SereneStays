import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) {
        return '';
    }

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close Photos
                        </button>
                    </div>

                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div key={photo}>
                            <img src={'http://localhost:4000/uploads/' + photo} alt="" />
                        </div>
                    ))}

                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-2xl">{place.title}</h1>
            
             <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place = {place} />

            <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    <p>Check-in: {place.checkIn}</p>
                    <p>Check-out: {place.checkOut}</p>
                    <p>Max number of guests: {place.maxGuests}</p>
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <h2 className="font-semibold text-2xl">Extra Info</h2>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
            </div>
        </div>
    );
}
