import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export default function Create(){
    const [errors, setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState();
    const [uniqueStudentID, setUniqueStudentID] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const prefix = "STU";
        const year = new Date().getFullYear().toString().slice(-2); // Extract the last two digits of the year
        const uniqueNumber = Math.floor(Math.random() * 1000);
        const studentID = `${prefix}-000${year}${uniqueNumber}`.slice(-12); // Format the ID and limit its length
        setUniqueStudentID(studentID);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          // You can perform additional checks or operations here if needed
          setSelectedImage(URL.createObjectURL(file));
        }
    };

    const submitStuInfo = async (e) => {
        e.preventDefault();

        setSuccessMessage();
        let errors = {};
        let studentData = {};
        
        // Using Array.from to convert e.target.elements to an array
        Array.from(e.target.elements).forEach((input) => {
          
            if(!input.value.trim() && input.type !== 'submit' && input.type !== 'file'){
                errors[input.name] = `The ${input.name} field is required`;
            }else if(input.name){
                studentData.id = Math.floor(Math.random() * 1000)
                studentData[input.name] = input.value;
                input.value = null;
            }
        });
    
        if (Object.keys(errors).length === 0) {
            // Assuming your JSON Server endpoint is http://localhost:3000/students
            try {
                const response = await fetch('http://localhost:3000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...studentData, image: selectedImage }),
                });
        
                if (response.ok) {
                setSelectedImage(null);
                console.log('Student data submitted successfully');
                // Reset form or perform any other actions after successful submission
                } else {
                console.error('Failed to submit student data');
                // Handle error, e.g., show an error message
                }
            } catch (error) {
                console.log('Error submitting student data:', error);
                // Handle error, e.g., show an error message
            }
    
        }else{
            setErrors(errors);
        }

    }

    return (
        <div className='max-w-[1240px] mx-auto'>
            <h1 className='text-3xl font-bold text-center py-5'>Add Student</h1>
            <div className='text-right'>
                <Link to='/student-info'>
                    <button className='bg-slate-500 py-2 px-5 rounded text-white'>Back to student list</button>
                </Link>
            </div>
            <div className='shadow-lg p-3 md:max-w-[70%] rounded mx-auto mt-5'>
                {
                    successMessage && 
                    <div className="bg-green-50 border border-green-400 text-green px-4 py-3 rounded relative mb-5" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline"> Your request has been submitted successfully.</span>
                        <span onClick={() => setSuccessMessage(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>
                }
                <form onSubmit={(e) => submitStuInfo(e)}>
                    <div className='mb-5 w-[120px] mx-auto'>
                        <label htmlFor='imageInput'>
                            <img
                            src={selectedImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}
                            alt="Selected" className='w-[120px] h-[120px] rounded-full cursor-pointer'/>
                        </label>
                        <input type="file" id="imageInput" accept="image/*" className='hidden' onChange={handleImageChange}/>
                    </div>
                    <div className='grid grid-cols-5'>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Student ID</label>
                            <input type='text' name='studentId' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Student ID' value={uniqueStudentID} readOnly />
                        </div>
                        <div className='col-span-2 m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Student Name</label>
                            <input type='text' name='name' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Student Name' />
                            {errors.name && <p className='text-red-500 pt-1'>{errors.name}</p>}
                        </div> 
                        <div className='col-span-2 m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                            <input type='text' name='email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Email' />
                            {errors.email && <p className='text-red-500 pt-1'>{errors.email}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-3'>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Age</label>
                            <input type='number' name='age' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Age' min='1' />
                            {errors.age && <p className='text-red-500 pt-1'>{errors.age}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Birthday</label>
                            <input type='date' name='birthday' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Birthday' />
                            {errors.birthday && <p className='text-red-500 pt-1'>{errors.birthday}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Gender</label>
                            <select name="gender" id="gender" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.gender && <p className='text-red-500 pt-1'>{errors.gender}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Phone Number</label>
                            {/* <PhoneInput
                                name='phone'
                                defaultCountry="bd"
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                                inputClassName="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            /> */}
                            <input type='text' name='phone' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Phone' />
                            {errors.phone && <p className='text-red-500 pt-1'>{errors.phone}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Street</label>
                            <input type='text' name='street' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Street' />
                            {errors.street && <p className='text-red-500 pt-1'>{errors.street}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Police Station</label>
                            <input type='text' name='policeStation' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Police Station' />
                            {errors.policeStation && <p className='text-red-500 pt-1'>{errors.policeStation}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>City</label>
                            <input type='text' name='city' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='City' />
                            {errors.city && <p className='text-red-500 pt-1'>{errors.city}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>State</label>
                            <input type='text' name='state' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='State' />
                            {errors.state && <p className='text-red-500 pt-1'>{errors.state}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Zip Code</label>
                            <input type='text' name='zip' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Zip Code' />
                            {errors.zip && <p className='text-red-500 pt-1'>{errors.zip}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Country</label>
                            <input type='text' name='country' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Country' />
                            {errors.country && <p className='text-red-500 pt-1'>{errors.country}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>University Name</label>
                            <input type='text' name='universityName' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='University Name' />
                            {errors.universityName && <p className='text-red-500 pt-1'>{errors.universityName}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Course Name</label>
                            <select name="course" id="course" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                <option disabled>Select a course</option>
                                <option value="BBA">BBA</option>
                                <option value="EEE">EEE</option>
                                <option value="CS">CS</option>
                            </select>
                            {errors.course && <p className='text-red-500 pt-1'>{errors.course}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Session</label>
                            <input type='text' name='session' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Session' />
                            {errors.session && <p className='text-red-500 pt-1'>{errors.session}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Major</label>
                            <input type='text' name='major' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Major' />
                            {errors.major && <p className='text-red-500 pt-1'>{errors.major}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Semester</label>
                            <select name="semester" id="semester" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                <option disabled>Select a semester</option>
                                <option value="1st">1st semester</option>
                                <option value="2nd">2nd semester</option>
                                <option value="3rd">3rd semester</option>
                                <option value="4th">4th semester</option>
                                <option value="5th">5th semester</option>
                                <option value="6th">6th semester</option>
                                <option value="7th">7th semester</option>
                                <option value="8th">8th semester</option>
                            </select>
                            {errors.semester && <p className='text-red-500 pt-1'>{errors.semester}</p>}
                        </div>
                        <div className='m-2'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Graduation Year</label>
                            <input type='text' name='graduationYear' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Graduation Year' />
                        
                        </div>
                    </div>
                    <div className='text-right'>
                        <button type='submit' className='p-2 bg-blue-500 rounded text-white px-5'>Add Student</button>
                    </div>
                </form>
            </div>
        </div>
    )
}