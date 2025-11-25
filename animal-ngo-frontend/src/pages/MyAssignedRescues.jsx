import React, { useState, useEffect } from 'react';
// Corrected relative paths assuming standard frontend structure
import { getMyAssignedRescues, updateRescueStatus } from '/src/api/rescueService.js'; 
import { useAuth } from '/src/context/AuthContext.jsx'; 
// Replaced react-icons/fa with inline SVGs

// Inline SVG Components for replacement
const FaPaw = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current"><path d="M256 0c-44.18 0-80 35.82-80 80c0 10.74 2.18 20.89 6.07 30.29l-36.98 36.98c-6.12 6.12-9.09 14.54-8.81 22.84c.38 10.94 4.54 21.04 11.83 28.33l78.89 78.89l-22.62 22.62c-3.12 3.12-3.12 8.19 0 11.31l33.94 33.94c3.12 3.12 8.19 3.12 11.31 0l22.62-22.62l78.89 78.89c7.29 7.29 17.39 11.45 28.33 11.83c8.3.28 16.72-2.69 22.84-8.81l36.98-36.98c9.4 3.89 19.55 6.07 30.29 6.07c44.18 0 80-35.82 80-80c0-44.18-35.82-80-80-80c-44.18 0-80 35.82-80 80c0 1.94.07 3.86.2 5.76l-80.11-80.11c-7.81-7.81-20.47-7.81-28.28 0l-80.11 80.11c.13-1.9.2-3.82.2-5.76c0-44.18-35.82-80-80-80zm134.63 158.41c-3.12-3.12-8.19-3.12-11.31 0l-22.62 22.62l-78.89-78.89c-7.29-7.29-17.39-11.45-28.33-11.83c-8.3-.28-16.72 2.69-22.84 8.81l-36.98 36.98c-3.12 3.12-3.12 8.19 0 11.31l36.98 36.98c6.12 6.12 9.09 14.54 8.81 22.84c-.38 10.94-4.54 21.04-11.83 28.33l-78.89 78.89l22.62 22.62c3.12 3.12 8.19 3.12 11.31 0l33.94-33.94c3.12-3.12 8.19-3.12 11.31 0l33.94 33.94c3.12 3.12 8.19 3.12 11.31 0l33.94-33.94c3.12-3.12 8.19-3.12 11.31 0l33.94 33.94c3.12 3.12 8.19 3.12 11.31 0l22.62-22.62l-78.89-78.89c-7.29-7.29-11.45-17.39-11.83-28.33c-.28-8.3 2.69-16.72 8.81-22.84l36.98-36.98c3.12-3.12 3.12-8.19 0-11.31l-36.98-36.98c-6.12-6.12-14.54-9.09-22.84-8.81c-10.94.38-21.04 4.54-28.33 11.83l-78.89 78.89zM368 80c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zM144 80c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48z"/></svg>;
const FaTimes = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4 fill-current"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>;
const FaCheckCircle = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0L143 281c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l40.1 40.1 101-101c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>;
const FaMapMarkerAlt = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4 fill-current"><path d="M215.7 499.2C267.4 430.4 384 279 384 192C384 86 298 0 192 0S0 86 0 192c0 87 116.6 238.4 168.3 307.2c12.3 16.7 35.8 16.7 48.2 0zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"/></svg>;
const FaPhoneAlt = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current"><path d="M164.9 24.6c-13.8-9.1-33.3-10.2-48.5-2.8l-128 64c-17.1 8.5-27.4 25.5-27.4 43.8V352c0 23.3 18.7 42.1 41.9 43.8l88 6.6c31.1 2.3 56.6 28.5 56.6 59.5v52.6c0 14.3 17.5 21.4 27.6 10.1l74.9-82.6c14.2-15.6 14.2-40.4 0-56l-67.4-74.1c-13.8-15.2-13.8-38.3 0-53.5l67.4-74.1c14.2-15.6 14.2-40.4 0-56L223.4 95.8c-10.1-11.3-27.6-4.2-27.6 10.1V158c0 31.1 25.5 57.3 56.6 59.5l88 6.6c23.2 1.7 41.9 20.5 41.9 43.8V480c0 17.1-10.3 34.1-27.4 42.6l-128 64c-15.2 7.4-34.7 6.3-48.5-2.8l-128-64zM48 288c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16v-32z"/></svg>;
const FaUser = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 35.7C5.3 331.6-1.5 450.7 2.1 493.6C5.6 538.5 42.6 576 88 576H360c45.4 0 82.4-37.5 85.9-82.4c3.6-42.9-3.2-162-178.3-207.3c-2.3-.7-4.7-1.1-7.1-1.1s-4.8 .4-7.1 1.1z"/></svg>;


const MyAssignedRescues = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusUpdating, setStatusUpdating] = useState(null); // ID of case being updated
    const [confirmAction, setConfirmAction] = useState(null); // { id: 1, status: 'resolved' }
    const { user } = useAuth();

    useEffect(() => {
        // Ensure user data is available before fetching
        if (user && user.role === 'volunteer') {
            fetchAssignedCases();
        }
    }, [user]);

    const fetchAssignedCases = async () => {
        setLoading(true);
        try {
            const data = await getMyAssignedRescues();
            setCases(data);
        } catch (err) {
            console.error("Error fetching assigned cases:", err);
            // Optionally set an error state
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = (caseId, newStatus) => {
        // Show custom confirmation modal/message box
        setConfirmAction({ id: caseId, status: newStatus });
    };
    
    const executeStatusUpdate = async () => {
        if (!confirmAction) return;
        
        const { id: caseId, status: newStatus } = confirmAction;

        setStatusUpdating(caseId);
        setConfirmAction(null); // Close confirmation immediately
        
        try {
            await updateRescueStatus(caseId, newStatus);
            // After successful update, fetch the list again
            // The case will disappear from the list as it's no longer 'active'
            fetchAssignedCases(); 
        } catch (err) {
            console.error(`Error updating status for case ${caseId}:`, err);
            // Use console.error instead of alert as per instructions
        } finally {
            setStatusUpdating(null);
        }
    };

    const getStatusBadge = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            assigned: "bg-blue-100 text-blue-800",
            resolved: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100'}`}>
                {status.toUpperCase()}
            </span>
        );
    };

    if (loading) return <div className="p-8 text-center text-xl text-gray-600">Loading your active rescues...</div>;

    if (cases.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Assigned Rescues 🐾</h1>
                <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-gray-100">
                    <FaPaw className="text-5xl text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg mb-4">No active cases are currently assigned to you.</p>
                    <p className="text-gray-500">Keep an eye on the "Nearby Cases" page for new opportunities!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Active Rescue Missions 🚨</h1>

            <div className="grid gap-6">
                {cases.map((rescue) => (
                    <div key={rescue.id} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{rescue.title}</h3>
                                {getStatusBadge(rescue.status)}
                            </div>
                            <div className="text-sm text-gray-500">
                                Case ID: {rescue.id}
                            </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 border-b pb-4">{rescue.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                            <p className="flex items-center"><FaUser /> <span className="ml-2">Reporter: {rescue.reporter_name}</span></p>
                            <p className="flex items-center"><FaPhoneAlt /> <span className="ml-2">Contact: {rescue.reporter_phone}</span></p>
                            <p className="flex items-center col-span-2"><FaMapMarkerAlt /> <span className="ml-2">Location: ({rescue.latitude}, {rescue.longitude})</span></p>
                            <p className="col-span-2">Reported: {new Date(rescue.created_at).toLocaleString()}</p>
                        </div>

                        <div className="flex space-x-4 pt-4 border-t">
                            <button
                                onClick={() => handleStatusUpdate(rescue.id, 'resolved')}
                                disabled={statusUpdating !== null}
                                className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150 disabled:bg-gray-400 flex items-center justify-center"
                            >
                                {statusUpdating === rescue.id ? 'Processing...' : (
                                    <>
                                        <FaCheckCircle /> <span className="ml-2">Mark as Rescued</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(rescue.id, 'cancelled')}
                                disabled={statusUpdating !== null}
                                className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 disabled:bg-gray-400 flex items-center justify-center"
                            >
                                <FaTimes /> <span className="ml-2">Cannot Rescue</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Confirmation Modal/Message Box */}
            {confirmAction && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
                        <h2 className={`text-xl font-bold mb-4 ${confirmAction.status === 'resolved' ? 'text-green-600' : 'text-red-600'}`}>
                            Confirm Action
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to mark case <span className="font-mono bg-gray-100 p-1 rounded text-sm">{confirmAction.id}</span> as <span className="font-semibold uppercase">{confirmAction.status}</span>?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setConfirmAction(null)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={executeStatusUpdate}
                                disabled={statusUpdating !== null}
                                className={`px-4 py-2 rounded-lg text-white font-semibold transition ${confirmAction.status === 'resolved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} disabled:bg-gray-400`}
                            >
                                {statusUpdating === confirmAction.id ? 'Updating...' : `Yes, ${confirmAction.status}`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAssignedRescues;