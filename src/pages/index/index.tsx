import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components'
import { useState } from 'react'
import { useLoad } from '@tarojs/taro'
import './index.scss'

// 添加预约窗口组件
const BookingModal = ({ visible, service, onClose, onSubmit }) => {
  if (!visible) return null;
  
  return (
    <View className='modal-overlay'>
      <View className='modal-content'>
        <View className='modal-header'>
          预约 {service.title}
        </View>
        <View className='modal-body'>
          <View className='form-item'>
            <View className='label'>服务时间</View>
            <View className='picker'>请选择服务时间</View>
          </View>
          <View className='form-item'>
            <View className='label'>联系电话</View>
            <input type='text' placeholder='请输入联系电话' />
          </View>
          <View className='form-item'>
            <View className='label'>备注信息</View>
            <textarea placeholder='请输入备注信息'></textarea>
          </View>
        </View>
        <View className='modal-footer'>
          <Button onClick={onClose} className='btn-cancel'>取消</Button>
          <Button onClick={onSubmit} className='btn-submit'>提交预约</Button>
        </View>
      </View>
    </View>
  )
}

const serviceGrids = [
  { id: 1, icon: '🏥', title: '医疗保健' },
  { id: 2, icon: '🧹', title: '家政服务' },
  { id: 3, icon: '👵', title: '养老照护' },
  { id: 4, icon: '🏃', title: '社区活动' },
  { id: 5, icon: '🎨', title: '文化教育' },
  { id: 6, icon: '🍲', title: '餐饮配送' },
  { id: 7, icon: '🛠️', title: '维修服务' },
  { id: 8, icon: '♻️', title: '环境保洁' },
  { id: 9, icon: '💊', title: '药品配送' },
]

const serviceList = [
  {
    id: 1,
    title: '居家保洁',
    desc: '专业保洁，打造洁净家居',
    price: '50元起',
    image: 'https://placeholder.com/150'
  },
  {
    id: 2,
    title: '上门医疗',
    desc: '专业医护，便捷就医服务',
    price: '100元起',
    image: 'https://placeholder.com/150'
  }
]

export default function Index() {
  // 添加状态管理
  const [showModal, setShowModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  // 处理预约点击
  const handleBooking = (service) => {
    setSelectedService(service)
    setShowModal(true)
  }

  // 处理预约提交
  const handleSubmit = () => {
    console.log('提交预约:', selectedService)
    setShowModal(false)
  }

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      {/* Banner区域 */}
      <Swiper
        className='banner'
        indicatorDots
        autoplay
        circular
      >
        <SwiperItem>
          <Image src='https://placeholder.com/750x300' className='banner-img' />
        </SwiperItem>
        <SwiperItem>
          <Image src='https://placeholder.com/750x300' className='banner-img' />
        </SwiperItem>
      </Swiper>

      {/* 九宫格服务分类 */}
      <View className='grid-container'>
        {serviceGrids.map(item => (
          <View key={item.id} className='grid-item'>
            <View className='grid-icon'>{item.icon}</View>
            <View className='grid-title'>{item.title}</View>
          </View>
        ))}
      </View>

      {/* 服务列表 */}
      <View className='service-list'>
        <View className='list-header'>热门服务</View>
        {serviceList.map(service => (
          <View key={service.id} className='service-item'>
            <Image className='service-img' src={service.image} />
            <View className='service-info'>
              <View className='service-title'>{service.title}</View>
              <View className='service-desc'>{service.desc}</View>
              <View className='service-price-row'>
                <View className='service-price'>{service.price}</View>
                <Button 
                  className='booking-btn'
                  onClick={() => handleBooking(service)}
                >
                  立即预约
                </Button>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* 添加预约弹窗 */}
      <BookingModal 
        visible={showModal}
        service={selectedService}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />
    </View>
  )
}
