import React, { Component } from 'react';
import { MdRefresh, MdCloudUpload } from 'react-icons/md';
import ReactCrop from 'react-image-crop';
import Axios from 'axios';

import 'react-image-crop/dist/ReactCrop.css'

class AvatarUpload extends Component {
    constructor(){
        super()
        this.state = {
            user: null,
            avatar: null,
            newAvatar: null,
            formData: null,
            file: null,
            src: null,
            type: null,
            crop: {
                unit: 'px',
                width: 215,
                aspect: 1/1,
            },
            croppedImage: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.writeCookie = this.writeCookie.bind(this); 
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

    dataURLtoFile(dataUrl, filename){
        let arr = dataUrl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
    
            while(n--){
              u8arr[n] = bstr.charCodeAt(n);
            }
    
            let croppedImage = new File([u8arr], filename, {type:mime});
            this.setState({croppedImage: croppedImage})
      }
    
      onImageLoaded = image => {
        this.imageRef = image
      }
    
      onCropChange = (crop) => {
        this.setState({crop});
      }
    
      onCropComplete = crop => {
        if(this.imageRef && crop.width && crop.height){
          const croppedImageUrl = this.getCroppedImg(this.imageRef, crop)
          this.setState({croppedImageUrl })
        }
      }
    
      getCroppedImg(image, crop){
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        )
    
        const reader = new FileReader();
        canvas.toBlob(blob => {
          reader.readAsDataURL(blob)
          reader.onloadend = () =>{
            this.dataURLtoFile(reader.result, this.state.file);
          }
        })
      }

      handleSubmit(event){
          event.preventDefault();

          const avatar = this.state.newAvatar;

          Axios.post('http://localhost:4200/api/users/update', {
              Username: this.state.user.toLowerCase(),
              update: {
                  Avatar: avatar
              }
          })
          .then(response => {
              console.log(response)

              this.writeCookie('sessionAvatar', this.state.newAvatar , 3);

              return new Promise(() => {

                const formData = new FormData()
                formData.append('File[]', this.state.croppedImage)

                const req = new XMLHttpRequest();

                req.open("POST", "http://localhost:4200/upload");
                req.send(formData);

                window.location.reload();

              })
          })
          .catch(err => console.log(err))
      }

    componentDidMount(){
        this.setState({avatar: this.readCookie('sessionAvatar'),
                        user: this.readCookie('sessionUser')})
    }
  render() {
    const { crop, src } = this.state
    return (
      <>

        <div id='currAvatarContainer'>
            <div id="currAvatar">
                <img src={this.state.avatar} alt='avatar'/>
            </div>
            <label htmlFor="avatarUp" className="labelAvatar" id='labelAvatar'><MdRefresh/>&nbsp;Change</label>
            <input 
                id="avatarUp"
                type="file"
                name="avatar"
                onChange={event => {

                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      this.setState({src: fileReader.result})
                    }
                    fileReader.readAsDataURL(event.target.files[0])

                    const files = document.querySelector('[name=avatar]').files;

                    console.log(files)

                    const filename = files[0].name.split('.')[0]

                    this.setState({newAvatar: 'http://localhost:4200/images/i/'+filename+'.png',
                                  file: filename+'.png',
                                  type: files[0].type}, () =>  console.log(this.state.file))

                }}
            />
        </div>

        <div id='upAvatarContainer'>
            <div id='avatarCropDash'>
                {src && (
                    <ReactCrop
                    src={src}
                    crop={crop}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                    circularCrop={true}
                    keepSelection={true}
                    locked={true}
                    /> 
                )}
            </div>

            <button onClick={this.handleSubmit}><MdCloudUpload/>&nbsp;Upload</button>
        </div>

      </>
    );
  }
}

export default AvatarUpload;
