import 'whatwg-fetch';

export default function getImage(imageName) {
    return `http://res.cloudinary.com/dtx9htwec/image/upload/${imageName}`
    // return fetch(`http://localhost:3001/api/images/${imageName}`);
}