import amazon from "../../assets/images/amazon-pay.png"
import american from "../../assets/images/American-Express-Color.png"
import master from "../../assets/images/mastercard.webp"
import paypal from "../../assets/images/paypal.png"
import applestore from "../../assets/images/get-apple-store.png"
import googlestore from "../../assets/images/get-google-play.png"

export default function Footer() {
  return (
    
    <footer className=' bg-slate-100 p-4 absolute left-0 right-0 bottom-0'>
      <div className=' container'>
        <h2 className=' capitalize text-3xl font-semibold '>get the fresh cart app</h2>
        <p className=' text-slate-600 mt-1'>
          we will send you a link, open it on your phone to download the app. 
        </p>
        <div className=' flex gap-4 items-center my-4'>
          <input className='form-control flex-grow ' type="email" placeholder='Email..'></input>
          <button className=' btn'>share app</button>
        </div>
        <div className="flex  items-center justify-between">
          <div className="flex items-center gap-4">
            <span className=" capitalize">payment partners</span>
            <img src={amazon } className="w-16" />
            <img src={american } className="w-16" />
            <img src={master } className="w-16" />
            <img src={paypal } className="w-16" />
          </div>
          <div className="flex items-center gap-4">
            <span className=" capitalize">get delivers with freshcart</span>
            <img src={applestore } className="w-16" />
            <img src={googlestore } className="w-16" />
          </div>
        </div>
      </div>
    </footer>
  )
}
