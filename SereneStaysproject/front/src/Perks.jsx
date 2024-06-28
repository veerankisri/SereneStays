import React from "react";

export default function Perks({ selected, onChange }) {
    function handleCbClick(ev) {
        const { checked, name } = ev.target;
        if (checked) {
            onChange([...selected, name]); // Add the perk to the selected list
        } else {
            onChange(selected.filter(selectedName => selectedName !== name)); // Remove the perk from the selected list
        }
    }

    return (
        <>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input
                    type="checkbox"
                    name="wifi"
                    checked={selected.includes("wifi")}
                    onChange={handleCbClick}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>Wifi</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input
                    type="checkbox"
                    name="parking"
                    checked={selected.includes("parking")}
                    onChange={handleCbClick}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <span>Free Parking spot</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input
                    type="checkbox"
                    name="TV"
                    checked={selected.includes("TV")}
                    onChange={handleCbClick}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                <span>TV</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input
                    type="checkbox"
                    name="Radio"
                    checked={selected.includes("Radio")}
                    onChange={handleCbClick}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                <span>Radio</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input
                    type="checkbox"
                    name="Pets"
                    checked={selected.includes("Pets")}
                    onChange={handleCbClick}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25-2.25h.006a2.25 2.25 0 0 1 2.25 2.25v.633a4.498 4.498 0 0 0 .322 1.672c.303.759.93 1.331 1.653 1.715a9.041 9.041 0 0 1 2.861 2.4c.498.634 1.225 1.08 2.031 1.08 1.42 0 2.75-1.21 2.75-2.75a2.75 2.75 0 0 0-2.75-2.75A2.75 2.75 0 0 0 17 7a2.751 2.751 0 0 0-2.75-2.75h-.006A2.751 2.751 0 0 0 11.5 7a2.75 2.75 0 0 0-2.75 2.75 2.75 2.75 0 0 0-2.75-2.75A2.75 2.75 0 0 0 3.25 7 2.751 2.751 0 0 0 .5 9.75C.5 11.29 1.83 12.5 3.25 12.5Zm.867 1.72a2.75 2.75 0 0 0 2.25-.1 3.501 3.501 0 0 0 3.75 0c.86-.433 1.936-.433 2.795 0a3.501 3.501 0 0 0 3.75 0c.72-.433 1.663-.65 2.25.1.556.62.583 1.533.072 2.312a8.262 8.262 0 0 1-2.673 2.568 6.282 6.282 0 0 1-2.062 3.37c-.726.632-1.644.98-2.605.98s-1.879-.348-2.605-.98a6.282 6.282 0 0 1-2.062-3.37 8.262 8.262 0 0 1-2.673-2.568c-.51-.78-.483-1.692.072-2.312Z" />
                </svg>
                <span>Pets</span>
            </label>

            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input
                    type="checkbox"
                    name="Private Entrance"
                    checked={selected.includes("Private Entrance")}
                    onChange={handleCbClick}
                />
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                 </svg>     
                <span>Private Entrance</span>
            </label>
        </>
    );
}