import React, { Component } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import Axios from 'axios';

class DashBanner extends Component {
    constructor(){
        super();
        this.state = {
            banner: '',
            formData: '',
            link: '',
        }
    }

    writeCookie(name,value,days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires=" + date.toGMTString();
                }else{
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    readCookie(name) {
        var i, c, ca, nameEQ = name + "=";
        ca = document.cookie.split(';');
        for(i=0;i < ca.length;i++) {
            c = ca[i];
            while (c.charAt(0)===' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return '';
    }

    componentDidMount(){

        var d = new Date();
        var n = d.getHours();

        if(n >= 23 || n <= 7){
            this.setState({banner: this.readCookie('sessionBanner')}, () => {
   
            })
        }else{
            this.setState({banner: 'http://localhost:4200/images/banner/default.jpg'}, () => {

            })
        }
    }
  render() {

    return (
        <>

            <div id='dashBanner'>
                <label htmlFor="bannerUpload" className="labelBanner" id='labelBanner'><MdCloudUpload/>&nbsp;Upload a banner</label>
                <input 
                    id='bannerUpload'
                    type="file" 
                    name="banner"
                    onChange={event => {

                        const formData = new FormData();
                        const files = document.querySelector('[type=file]').files;

                        formData.append('files[]', files[0]);

                        this.setState({formData: formData,
                                        link: 'http://localhost:4200/images/banner/'+files[0].name}, () => {

                                            this.writeCookie('sessionBanner', this.state.link);

                            Axios.post('http://localhost:4200/api/users/update', {
                                Username: this.readCookie('sessionUser').toLowerCase(),
                                update: {
                                    Banner: this.state.link,
                                }
                            })
                            .then((resp) => {
                                console.log(resp)

                                return new Promise((resolve, reject) => {
                                    const req = new XMLHttpRequest();
    
                                    req.open('POST', 'http://localhost:4200/banner');
                                    req.send(this.state.formData);
    
                                    //window.location.reload();

                                })
                            })
                            .catch(err => console.log(err))

                        })
                        
                    }}
                />
                <div className='cover'></div>
                <img src={this.state.banner} alt='banner' id='imgBanner'/>
            </div>

        </>
    );
  }
}

export default DashBanner;
