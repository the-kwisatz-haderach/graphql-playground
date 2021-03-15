import { TextField } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { ILocationInput } from '../../types/graphql'
import { Button } from '../Button'

interface Props {}

export default function AddLocationForm({}: Props): ReactElement {
  const { register, handleSubmit, errors } = useForm<ILocationInput>()

  const submitForm = (data: ILocationInput) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <TextField name="name" inputRef={register} label="Name" fullWidth />
      <TextField
        name="description"
        inputRef={register}
        label="Description"
        fullWidth
      />
      <Button style={{ width: '100%' }} type="submit">
        Save
      </Button>
    </form>
  )
}
