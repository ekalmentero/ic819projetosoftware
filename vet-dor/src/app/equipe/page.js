const Carol = "/assets/Carol.jpeg"
const Sarah = "./assets/Sarah.jpg"
const max = "./assets/max.png"
import "./equipe.css"

export default function Equipe() {
  return(
    <>
    <div className="equipeDiv" >
          <h1>Nossa Equipe:</h1>
      <div>
          <div className="equipe-membros">
              <img className="foto" src={Carol} />
              <p>Caroline</p>
              <ul>Front-End</ul>
              <ul>Designer</ul>
          </div>

          <div className="equipe-membros">
              <img className="fotomax" src={max} />
              <p>Max Felipe</p>
              <ul>Front-End</ul>
              <ul>Back-End</ul>
          </div>

          <div className="equipe-membros">
              <img className="foto" src={Sarah} />
              <p>Sarah Ellen</p>
              <ul>Front-End</ul>
              <ul>Refatoração</ul>
              <ul>Designer</ul>
          </div>
      </div>
    </div>
    </>
  )
  
}