export default async function retrieveContent() {
    const url = " http://localhost:3000/api/teddies";
    const res = await fetch(url);
    return res.json();
}
