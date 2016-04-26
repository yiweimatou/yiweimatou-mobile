import React from 'react'
import {Slider} from 'amazeui-touch'

const SliderCaption = (Items)=>{
    <Slider>
        {Items.map((item,index)=>{
            return (
                <Slider.Item 
                    key={index}
                >
                    <img src={item.path} />
                    <div className='slider-caption'>
                        item.desc
                    </div>
                </Slider.Item>
            )
        })}
    </Slider>
}

export default SliderCaption
