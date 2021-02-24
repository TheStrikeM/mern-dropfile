import axios from 'axios'

export const getFiles = async (dirId, dispatch) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/api/file${dirId ? '?parent='+dirId : ''}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        console.log(response.data)
    } catch (e) {
        console.log('Error:', e.response.data.message)
    }
}