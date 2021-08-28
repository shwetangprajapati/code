import React, { useState } from 'react'
import classes from './Uploadcv.module.css';
import { FaRegAddressBook } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
const Uploadcv = () => {

    const [chooseFile, setChooseFile] = useState()

    console.log('File', chooseFile)
    return (
        <div className="d-none d-sm-block">
            <div className={classes.uploadcv_head}>
                <div className={classes.uploadcv_texticon}>
                    <h6><FaRegAddressBook />&nbsp;CV</h6>
                </div>
                <p className={classes.uploadcv_text}>Upload a new CV, use our CV builder to build one for you.</p>
                  <div >
                     
                    <input type="text"
                        value={chooseFile}
                        htmlFor="getFile"
                        className={classes.uploadcv_input2}
                    />
                </div>
                {/* <div onClick={() => setChooseFile('')}className={classes.uploadcv_iconsflex} >
                    <ImAttachment className={classes.uploadcv_icon} />
                    <IoMdClose className={classes.uploadcv_icon2} />
                </div> */}
                <div className={classes.uploadcv_btn}>
                    <input type='file'
                        id="getFile"
                        className={classes.uploadcv_input}
                        value={chooseFile}
                        onChange={(e) => setChooseFile(e.target.value)} />
                         <button className={classes.mid_btn}> Upload CV</button>
                </div>
            </div>
        </div>
        
    )
}

export default Uploadcv;
