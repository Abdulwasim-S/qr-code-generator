import { useState } from 'react';
import './App.css';
import QRCode from 'qrcode';
import Select from 'react-dropdown-select';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Component/Header';
import Footer from './Component/Footer';

function App() {
  const [value,setValue]=useState("");
  const [code,setCode]=useState("");
  const [height,setHeight]=useState(200);
  const [width,setWidth]=useState(200);
  const [dark,setDark]=useState("#000000");
  const [light,setLight]=useState("#FFFFFF");
  const [format,setFormat]=useState("png");
  const formatOptions = [
    {
      id: 1,
      name: "png"
    },
    {
      id:  2,
      name: "jpg"
    },
    {
      id:  3,
      name: "jpeg"
    },
    {
      id:  4,
      name: "webp"
    }
  ];
  const generate=()=>{
    QRCode.toDataURL(value,{
      height,
      width,
      margin:2,
      color: {
        dark,
        light
      }
    },(error,value)=>{
      if(error){return console.log(error)}
      console.log(value);
      setCode(value)
    })
  }
  return (
    <div className="App">
      <Header/>
      <div className='container mb-3'>
        <div className='row'>
          <div className='col-md-6 text-start'>
            <lable>Enter the Data :</lable>
            <input className='form-control mb-3' type='text' placeholder='enter data...' onChange={(e)=>setValue(e.target.value)}/>
            <div className='row'>
            <div className='col-6 mb-3'>
              <label>Height :</label>
              <input className='form-control ' value={height} placeholder='Height' type='text' onChange={(e)=>setHeight(e.target.value)}/>
            </div>
            <div className='col-6 mb-3'>
              <label>Width :</label>
              <input className='form-control ' value={width} placeholder='Width' type='text' onChange={(e)=>setWidth(e.target.value)}/>
            </div>
            <div className='col-6 mb-3'>
              <label>QR Color :</label>
              <input className='form-control' value={dark} type='color' onChange={(e)=>setDark(e.target.value)}/>
            </div>
            <div className='col-6 mb-3'>
              <label>Background Color :</label>
              <input className='form-control' value={light} type='color' onChange={(e)=>setLight(e.target.value)}/>
            </div>
            <div className='col-12 mb-3'>
              <label>Format :</label>
              <Select className='form-control' options={formatOptions} labelField="name" valueField="id" onChange={(values) => {setFormat(values[0].name)}} />
            </div>
            <button className=' btn btn-primary mt-3 mb-2' onClick={()=>value?generate():alert("Enter Data")}>Generate</button>
            <a className={' btn btn-success mb-2 '+(code===""?"disabled":"")} href={code} download={"QRCode."+format}>Download</a>
          </div>
          </div>
          <div className='qrpage col-md-6 text-center'>
            <div className='qr-img'>
            {code ===""?<h1 className='text-center text-secondary pt-5'>QR Code Board</h1> :<img className='p-3' height={"100%"} width={"50%"} src={code} alt=''/>}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
