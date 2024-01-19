import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import HeaderBar from './components/HeaderBar'
import Clip from './components/Clip'
import LeadCard from './components/LeadCard'

const clipData=['All','Pending','In-Progress','Followup On Interest','Interested','Done']
const AllLeads = () => {
  return (
    <View className='flex-1 bg-white'>
    <HeaderBar name={'Leads'} logo={true} help={false} search={true}/>
    <View>

    <ScrollView horizontal>
      <View className='flex-row justify-start px-3 py-3'>
      {
        clipData.map((val,key)=>(
          <Clip name={val} key={key}/>
          ))
        }
      </View>
    </ScrollView>
        </View>
    <View className='px-3'>
        <LeadCard/>
        <LeadCard/>
        <LeadCard/>
        <LeadCard/>
      </View>
  </View>
  )
}

export default AllLeads