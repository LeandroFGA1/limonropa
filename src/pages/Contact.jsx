import React, { useState } from 'react'
import {
  Input,
  Select,
  Option,
  Textarea,
  Button,
  Typography,
} from '@material-tailwind/react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../App'

const Contact = () => {
  const { state } = useLocation()
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    motivo: state?.motivo || '',
    mensaje: state?.mensaje || '',
  })

  const [feedback, setFeedback] = useState({ success: '', error: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMotivoChange = (val) => {
    setFormData((prev) => ({ ...prev, motivo: val || '' }))
  }

  const handleSubmit = async () => {
    const { nombres, email, mensaje } = formData
    if (!nombres.trim() || !email.trim() || !mensaje.trim()) {
      setFeedback({ error: 'Completa los campos obligatorios.', success: '' })
      return
    }

    try {
      const payload = {
        nombre: formData.nombres,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        tipo_contacto: formData.motivo,
        mensaje: formData.mensaje,
      }

      await axios.post(`${BASE_URL}api/contact/`, payload)

      setFeedback({ success: '¡Mensaje enviado exitosamente!', error: '' })
      setFormData({
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        motivo: '',
        mensaje: '',
      })
    } catch {
      setFeedback({
        error: 'Error al enviar el formulario. Intenta más tarde.',
        success: '',
      })
    }
  }

  return (
    <section className="min-h-screen bg-main2 py-12 px-4 animate-fadeInUp">
      <div className="max-w-3xl mx-auto bg-main3/10 p-6 rounded-xl shadow-md flex flex-col gap-6">
        <Typography
          variant="h3"
          className="text-center text-main3 font-extrabold"
        >
          Contáctanos
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombres *"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
          />
          <Input
            label="Apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleInputChange}
          />
          <Input
            label="Email *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
          />
        </div>

        <Select
          label="Motivo"
          value={formData.motivo}
          onChange={handleMotivoChange}
          className="text-main3"
        >
          <Option value="producto">Producto</Option>
          <Option value="servicio">Servicio</Option>
          <Option value="otro">Otro</Option>
        </Select>

        <Textarea
          label="Mensaje *"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleInputChange}
        />

        {feedback.success && (
          <Typography className="text-green-700">{feedback.success}</Typography>
        )}
        {feedback.error && (
          <Typography className="text-red-700">{feedback.error}</Typography>
        )}

        <div className="flex justify-center">
          <Button
            className="bg-main3 text-main2 hover:bg-main shadow-md px-8 py-2 rounded-full"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Contact
