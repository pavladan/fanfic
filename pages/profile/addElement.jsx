import React from "react"
import { Form, Col, Button, Row } from 'react-bootstrap';

const AddElement = () => {


    const genre = ["Hurt", "POV", "PWP", "Songfic", "Ангст", "Антиутопия", "Даркфик", "Детектив", "Драма ",
        "Любовь", "Мистика", "Повседневность", "Психология", "Романтика", "Ужасы", "Фантастика", "Фэнтези"]

    const handleSubmitFanFic = async (e) => {
        e.preventDefault();
        const body = {
            nameFanfic: e.currentTarget.nameFanfic.value,
            desctiption: e.currentTarget.desctiption.value,
            password: e.currentTarget.password.value,
        };
        console.log(body);
        try {
            const res = await axios.post("/api/users", body);
            if (res.status === 201) {
                const userObj = await res.data.user;
                mutate(userObj);
            }
        } catch (err) {
            setErrorMsg(err.response.data);
        }

    };


    return (
        <div className="forms-wrapper">

            <Form onSubmit={handleSubmitFanFic}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="nameFanfic" 
                        name="nameFanfic" placeholder="Name" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Desctiption</Form.Label>
                    <Form.Control as="textarea" placeholder="Description"
                       rows={3} />
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>Genre</Form.Label>
                    <Col sm={10}>
                        {genre.map((val) => (
                            
                            <Form.Check key={val} className="genre-element" inline
                                type="checkbox"
                                label={val}
                                name={val}
                                id={val}
                                onChange={}
                            />
                        ))}
                    </Col>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Text"
                        name="text" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>

    )
}

export default AddElement;