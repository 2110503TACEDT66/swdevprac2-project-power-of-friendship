'use client'

import React from "react";
import userRegister from "@/libs/userRegister";

export default function registerPage() {

    const handleSubmit = async (e: any) => {        
        e.preventDefault();
        
        const data = {
            "name": e.target.name.value,
            "email": e.target.email.value,
            "password": e.target.password.value,
            "tel": e.target.Tel.value,
            "role": "user"
        }

        userRegister(data);
    }
    
    return (
        <main className = 'flex flex-col items-center'>     
            <div className="flex flex-row justify-center mt-5">
                <div className="text-xl font-medium px-5 py-2 rounded-xl bg-white w-fit font-serif">Register</div>
            </div>
            <form onSubmit={handleSubmit} className = 'flex flex-col items-center bg-white w-fit py-5 px-10 rounded-2xl mt-3'>
                <div>
                    <div className="flex items-center w-1/2 my-2">
                        <label htmlFor="name" className="w-auto block text-gray-700 pr-4">Username</label>
                        <input type="text" required id ="name" name="name" placeholder="username" className="bg-white border-2 border-gray-200 rounded p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label htmlFor="email" className="w-auto block text-gray-700 pr-4">Email</label>
                        <input type="text" required id ="email" name="email" placeholder="email" className="ml-9 bg-white border-2 border-gray-200 rounded p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label htmlFor="password" className="w-auto block text-gray-700 pr-4">Password</label>
                        <input type="text" required id ="password" name="password" placeholder="password" className="ml-1 bg-white border-2 border-gray-200 rounded p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label htmlFor="tel" className="w-auto block text-gray-700 pr-4">Telephone</label>
                        <input type="text" required id ="Tel" name="Tel" placeholder="telephone" className="bg-white border-2 border-gray-200 rounded p-2 text-gray-700 focuse:outline-none focus:border-blue-400"/>
                    </div>
                </div>
                <button className="block rounded-2xl bg-cyan-600 hover:bg-cyan-800 px-3 py-2 text-white shadow-sm mt-2" type="submit">submit</button>
            </form>
        </main>
    );
}
