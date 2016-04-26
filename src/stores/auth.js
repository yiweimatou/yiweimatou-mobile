const user = () => {
    if (!window.localStorage) {
        return null;
    }
    return JSON.parse(localStorage.getItem('user'))
}

const auth = {
    isAuthenticated:()=>{
        !!user()
    }
}

export default auth