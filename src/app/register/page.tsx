'use client'

import Car from "@/db/Models/Car";
import { dbConnect } from "@/db/dbConnect";
import User from "@/db/Models/User";
import React from "react";
import Alert from '@mui/material/Alert';
import { useRouter } from "next/router";



export default  function registerPage(){

    const handleSubmit = ((e:any) => {
        e.preventDefault()
        const data = {
            "name": e.target.name.value,
            "email":e.target.email.value,
            "password":e.target.password.value,
            "tel":e.target.Tel.value,
            "role": "user"
        }
        fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                console.log(result.success);
                alert("Congratulation")
                if(result.success === true){
                    window.location.href = '/';
                }      
            })
    })
        


    return (
        <main className = 'bg-slate-100 m-5 p-5'>     
            <form onSubmit={handleSubmit}>
                <div className="text-xl text-blue-700">Register</div>
                <div className="flex items-center w-1/2 my-2">
                    <label htmlFor="name" className="w-auto block text-gray-700 pr-4">
                        Username
                    </label>
                    <input type="text" required id ="name" name="name" placeholder="username" className="bg-white border-2
                    border-gray-200 rounded w-full p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label htmlFor="email" className="w-auto block text-gray-700 pr-4">
                        Email
                    </label>
                    <input type="text" required id ="email" name="email" placeholder="email" className="bg-white border-2
                    border-gray-200 rounded w-full p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label htmlFor="password" className="w-auto block text-gray-700 pr-4">
                        Password
                    </label>
                    <input type="text" required id ="password" name="password" placeholder="password" className="bg-white border-2
                    border-gray-200 rounded w-full p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label htmlFor="tel" className="w-auto block text-gray-700 pr-4">
                        Telephone
                    </label>
                    <input type="text" required id ="Tel" name="Tel" placeholder="telephone" className="bg-white border-2
                    border-gray-200 rounded w-full p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                </div>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-3 text-white shadow-sm" type="submit">submit</button>
            </form>

        </main>
    );
}
