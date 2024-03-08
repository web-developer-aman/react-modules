import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit(){
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [errors, setErrors] = useState({})
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch student data based on the id
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/students/${id}`);
        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        } else {
          console.error('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error while fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [id]);

const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // You can perform additional checks or operations here if needed
      setSelectedImage(URL.createObjectURL(file));
    }
};

const submitStuInfo = async (e) => {
    e.preventDefault();
    let errors = {};
    let studentData = {};

    // Using Array.from to convert e.target.elements to an array
    Array.from(e.target.elements).forEach((input) => {
      
        if(!input.value.trim() && input.type !== 'submit' && input.type !== 'file'){
            errors[input.name] = `The ${input.name} field is required`;
        }else if(input.name){
            studentData.id = Math.floor(Math.random() * 1000)
            studentData[input.name] = input.value;
        }
    });

    if (Object.keys(errors).length === 0) {
        // Assuming your JSON Server endpoint is http://localhost:3000/students
        try {
            const response = await fetch(`http://localhost:3000/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...studentData, image: selectedImage || student.image}),
            });
    
            if (response.ok) {
                setErrors({});
                console.log('Student data submitted successfully');
                toast.success('Student updated successfully', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
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

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className='max-w-[1240px] mx-auto'>
        <ToastContainer />
        <h1 className='text-3xl font-bold text-center py-5'>Add Student</h1>
        <div className='text-right'>
            <Link to='/student-info'>
                <button className='bg-slate-500 py-2 px-5 rounded text-white'>Back to student list</button>
            </Link>
        </div>
        <div className='shadow-lg p-3 md:max-w-[70%] rounded mx-auto mt-5'>
            <form onSubmit={(e) => submitStuInfo(e)}>
                <div className='mb-5 w-[120px] mx-auto'>
                    <label htmlFor='imageInput'>
                        <img
                        src={selectedImage || student.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}
                        alt="Student Image" className='w-[120px] h-[120px] rounded-full cursor-pointer border'/>
                    </label>
                    <input type="file" id="imageInput" accept="image/*" className='hidden' onChange={handleImageChange}/>
                </div>
                <div className='grid grid-cols-5'>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Student ID</label>
                        <input type='text' defaultValue={student.studentId} name='studentId' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' readOnly />
                    </div>
                    <div className='col-span-2 m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Student Name</label>
                        <input type='text' defaultValue={student.name} name='name' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Student Name' />
                        {errors.name && <p className='text-red-500 pt-1'>{errors.name}</p>}
                    </div> 
                    <div className='col-span-2 m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                        <input type='text' defaultValue={student.email} name='email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Email' />
                        {errors.email && <p className='text-red-500 pt-1'>{errors.email}</p>}
                    </div>
                </div>
                <div className='grid grid-cols-3'>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Age</label>
                        <input type='number' defaultValue={student.age} name='age' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Age' min='1' />
                        {errors.age && <p className='text-red-500 pt-1'>{errors.age}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Birthday</label>
                        <input type='date' defaultValue={student.birthday} name='birthday' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Birthday' />
                        {errors.birthday && <p className='text-red-500 pt-1'>{errors.birthday}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Gender</label>
                        <select name="gender" defaultValue={student.gender} id="gender" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
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
                        <input type='text' defaultValue={student.phone} name='phone' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Phone' />
                        {errors.phone && <p className='text-red-500 pt-1'>{errors.phone}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Street</label>
                        <input type='text' defaultValue={student.street} name='street' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Street' />
                        {errors.street && <p className='text-red-500 pt-1'>{errors.street}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Police Station</label>
                        <input type='text' defaultValue={student.policeStation} name='policeStation' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Police Station' />
                        {errors.policeStation && <p className='text-red-500 pt-1'>{errors.policeStation}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>City</label>
                        <input type='text' defaultValue={student.city} name='city' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='City' />
                        {errors.city && <p className='text-red-500 pt-1'>{errors.city}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>State</label>
                        <input type='text' defaultValue={student.state} name='state' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='State' />
                        {errors.state && <p className='text-red-500 pt-1'>{errors.state}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Zip Code</label>
                        <input type='text' defaultValue={student.zip} name='zip' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Zip Code' />
                        {errors.zip && <p className='text-red-500 pt-1'>{errors.zip}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Country</label>
                        <input type='text' defaultValue={student.country} name='country' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Country' />
                        {errors.country && <p className='text-red-500 pt-1'>{errors.country}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>University Name</label>
                        <input type='text' defaultValue={student.universityName} name='universityName' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='University Name' />
                        {errors.universityName && <p className='text-red-500 pt-1'>{errors.universityName}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Course Name</label>
                        <select name="course" defaultValue={student.course} id="course" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                            <option disabled>Select a course</option>
                            <option value="BBA">BBA</option>
                            <option value="EEE">EEE</option>
                            <option value="CS">CS</option>
                        </select>
                        {errors.course && <p className='text-red-500 pt-1'>{errors.course}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Session</label>
                        <input type='text' defaultValue={student.session} name='session' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Session' />
                        {errors.session && <p className='text-red-500 pt-1'>{errors.session}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Major</label>
                        <input type='text' defaultValue={student.major} name='major' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Major' />
                        {errors.major && <p className='text-red-500 pt-1'>{errors.major}</p>}
                    </div>
                    <div className='m-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Semester</label>
                        <select name="semester" defaultValue={student.semester} id="semester" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
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
                        <input type='text' defaultValue={student.graduationYear} name='graduationYear' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Graduation Year' />
                        {errors.graduationYear && <p className='text-red-500 pt-1'>{errors.graduationYear}</p>}
                    </div>
                </div>
                <div className='text-right'>
                    <button type='submit' className='p-2 bg-blue-500 rounded text-white px-5'>Update Student</button>
                </div>
            </form>
        </div>
    </div>
    )
};
