import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [price, setPrice] = useState(100);
    const [maxGuests, setMaxGuests] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) return;

        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos || []);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text) {
        return <h2 className='text-2xl mt-4'>{text}</h2>;
    }

    function inputDescription(text) {
        return <p className='text-gray-500 text-sm'>{text}</p>;
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };

        try {
            if (id) {
                await axios.put(`/places/${id}`, placeData);
            } else {
                await axios.post('/places', placeData);
            }
            setRedirect(true);
        } catch (error) {
            console.error('Error saving place:', error);
        }
    }

    if (redirect) {
        return <Navigate to='/account/places' />;
    }

    return (
        <div>
            <AccountNav />
            <form className='text-left' onSubmit={savePlace}>
                {preInput('Title', 'Title for your place. Should be short and catchy like an advertisement')}
                <input type="text" placeholder="Title, for example: My lovely apartment" value={title} onChange={ev => setTitle(ev.target.value)} />
                
                {preInput('Address', 'Address to this place')}
                <input type='text' placeholder='Address' value={address} onChange={ev => setAddress(ev.target.value)} />
                
                {preInput('Photos', 'More = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                
                {preInput('Description', 'Description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                
                {preInput('Perks', 'Select all the perks of your place')}
                <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                
                {preInput('Extra info', 'House rules, etc.')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                
                {preInput('Check in&out times', 'Add check in and out times')}
                <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input type="text" placeholder='14:00' value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input type="text" placeholder='11:00' value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Prices per night</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                
                <button className='primary my-4'>Save</button>
            </form>
        </div>
    );
}
