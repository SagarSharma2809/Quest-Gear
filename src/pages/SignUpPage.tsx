export default function SignUpPage() {
    return (

        <div className="flex flex-col items-center">
            <h1 className="text-center text-4xl">Create new account</h1>

            {/* submit form post to backend server */}
            <form action="http://localhost:3000/submit" method="POST" className="flex flex-col w-2/3 md:w-1/3 justify-center items-center gap-2 p-4 m-4">
                <input type="text" placeholder="Create Username" className="w-full border-2 border-black" name="username" />
                <input type="email" placeholder="Enter Email" className="w-full border-2 border-black" name="email" />

                <input type="password" placeholder="Enter password" className="w-full border-2 border-black" name="password" />
                <input type="password" placeholder="Confirm password" className="w-full border-2 border-black" name="confirm" />
                <input type="submit" className="bg-blue-900 text-white px-4 py-2 cursor-pointer hover:bg-blue-400 hover:text-black hover:border hover:border-white" value="submit" />
            </form>
        </div>
    )
}