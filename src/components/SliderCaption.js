import React from 'react'
import {Slider} from 'amazeui-touch'

const SliderCaption = ({Items})=>{
    if(Items.length === undefined){
        return null
    }
    return(<Slider>
        {Items.map((item,index)=>{
            return (
                <Slider.Item 
                    key={index}
                >
                    <img src={`${item.cover_path}512_256.png`} />
                    <div className='slider-caption'>
                        {item.names}
                    </div>
                </Slider.Item>
            )
        })}
    </Slider>)
}

export default SliderCaption
