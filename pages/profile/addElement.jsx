import React,{useState} from "react";
import { Form, Col, Button, Row } from "react-bootstrap";

const genre = [
  "Hurt",
  "POV",
  "PWP",
  "Songfic",
  "Ангст",
  "Антиутопия",
  "Даркфик",
  "Детектив",
  "Драма",
  "Любовь",
  "Мистика",
  "Повседневность",
  "Психология",
  "Романтика",
  "Ужасы",
  "Фантастика",
  "Фэнтези",
];

const AddElement = () => {
	const [genres,setGenres] = useState(genre.map(e=>({name:e,value:false})));

  const handleSubmitFanFic = async (e) => {
    e.preventDefault();
		const selectedGenres = genres.filter(e=>e.value===true).map(e=>e.name)
    const body = {
      name: e.currentTarget.nameFanfic.value,
			description: e.currentTarget.description.value,
			genres: selectedGenres,
      text: e.currentTarget.text.value,
		};
    console.log(body);
    // try {
    //     const res = await axios.post("/api/users", body);
    //     if (res.status === 201) {
    //         const userObj = await res.data.user;
    //         mutate(userObj);
    //     }
    // } catch (err) {
    //     setErrorMsg(err.response.data);
    // }
  };

  return (
    <div className="forms-wrapper">
      <Form onSubmit={handleSubmitFanFic}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="nameFanfic"
            placeholder="Name"
            required
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.Description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" placeholder="Description" name="description" rows={3} required/>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Genre
          </Form.Label>
          <Col sm={10}>
            {genres.map((val) => (
              <Form.Check
                key={val.name}
                className="genre-element"
                inline
                type="checkbox"
								label={val.name}
								value={val.value}
								onChange={()=>setGenres(old=>old.map(e=>{
									if (e.name === val.name){
										return {...e, value:!e.value}
									}
									return e
								}))}
              />
            ))}
          </Col>
        </Form.Group>
        <Form.Group controlId="exampleForm.Text">
          <Form.Label>Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Text"
            name="text"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddElement;
