import type { StoryFn, Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'

import chase from '@/assets/images/Type=Chase.png'
import earnIn from '@/assets/images/Type=EarnIn.png'
import homeDepot from '@/assets/images/Type=Home Deopt.png'
import mcdonald from '@/assets/images/Type=Mcdonalds.png'
import shell from '@/assets/images/Type=Shell.png'
import walmart from '@/assets/images/Type=Walmart.png'

import Select, { Option, SelectProps } from './Select'

const Story: Meta<typeof Select> = {
  component: Select,
  title: 'Design System/Select',
  argTypes: {
    size: {
      options: ['medium', 'small', 'xs'],
      control: { type: 'radio' },
    },
  },
}
export default Story

const Template: StoryFn<typeof Select> = (args: SelectProps) => {
  const name = 'fieldName'
  const { register } = useForm()
  return <Select {...args} {...register(name)} />
}

export const Primary = Template.bind({})
export const NoLabel = Template.bind({})
export const LeftIcon = Template.bind({})

const valuesNoIcon: Option[] = [
  { id: '1', label: 'Durward Reynolds', value: '2' },
  { id: '2', label: 'Kenton Towne', value: '2' },
  { id: '3', label: 'Therese Wunsch', value: '2' },
  { id: '4', label: 'Benedict Kessler', value: '2' },
  { id: '5', label: 'Katelyn Rohan', value: '2' },
]

const values: Option[] = [
  { id: '1', label: 'Chase', value: '1', icon: <img src={chase} alt="chase" /> },
  { id: '2', label: 'EarnIn', value: '2', icon: <img src={earnIn} alt="earnIn" /> },
  { id: '3', label: 'Home Depot', value: '3', icon: <img src={homeDepot} alt="homeDepot" /> },
  { id: '4', label: 'Walmart', value: '4', icon: <img src={walmart} alt="walmart" /> },
  { id: '5', label: 'Mcdonald', value: '5', icon: <img src={mcdonald} alt="mcdonald" /> },
  { id: '6', label: 'Shell', value: '6', icon: <img src={shell} alt="shell" /> },
]

Primary.args = {
  label: 'Select options',
  size: 'MEDIUM',
  options: valuesNoIcon,
}
NoLabel.args = {
  label: '',
  size: 'MEDIUM',
  options: valuesNoIcon,
}

LeftIcon.args = {
  label: 'Select options',
  size: 'MEDIUM',
  options: values,
}
