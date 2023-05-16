import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Musiclist() {
  const [data, setData] = useState([]);
  const [search,setSearch]=useState([])
  const [currentplay,setcurrentplay]=useState(null)
  useEffect(() => {
    fetch('https://63ad89c73e465169165d0698.mockapi.io/products')
      .then((resp) => resp.json())
      .then((res) =>{
        const result=res.sort((a,b)=>a.movie.localeCompare(b.movie))
        setData(result)
      });
  }, []);
  const handleplay=(audio)=>{
    if(currentplay){
     currentplay.pause()
    }
    setcurrentplay(audio)
    audio.play()
  }
  return (
    <>
      <Container>
        <center>
        <Row className="g-5">
          <center>
            <h2>Music Playlist</h2><br/><br/>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>&nbsp;
          </center>

          {data.filter(el=>el.movie.toLowerCase().includes(search)).map((ele) => {
            return (
              <>
                <Col xs={12} lg={4} xl={3} md={6} className="m-6">
                  <Card
                    style={{ width: '20rem', height: '30rem' }}
                    className="cards"
                  >
                    <center>
                      <h4
                        style={{
                          'margin-top': '15px',
                          'margin-bottom': '30px',
                        }}
                      >
                        {ele.movie}
                      </h4>
                    </center>
                    <Card.Body>
                     
                          <Card.Img
                          variant="top"
                          src={ele.img}
                          style={{
                            width: '15rem',
                            height: '15rem',
                            margin: '15px',
                          }}
                        />
                      <audio controls controlsList="nodownload" onPlay={(e)=>handleplay(e.target)}>
                        <source src={ele.song} type="audio/mp3" />
                      </audio>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
        </center>
      </Container>
    </>
  );
}
export default Musiclist;
