import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

const getItems = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/factures.json', 'utf8')
    console.log('Données factures récupérées');
    
    const list = JSON.parse(data)
    res.json(list)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Error reading factures file' })
  }
}

const getItem = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/factures.json', 'utf8')
    const list = JSON.parse(data)
    const item = list.find(item => item.id == req.params.id)

    if (!item) {
      res.status(404).json({ error: true, message:'Facture not found' })
      return
    }
    res.json(item)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Error reading factures file' })
  }
}

const patchItem = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/factures.json', 'utf8')
    const list = JSON.parse(data)
    const itemToEdit = list.find(item => item.id == req.params.id)
    if (!itemToEdit) {
      res.status(404).json({ error: true, message:'Facture not found' })
      return
    }
    const itemToSave = {
      ...itemToEdit,
      ...req.body
    }
    const listToSave = list.map(item => item.id == req.params.id ? itemToSave : item)
    await fs.promises.writeFile('./db/factures.json', JSON.stringify(listToSave, null, 2))

    res.json(itemToSave)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Error updating facture' })
  }
}

const postItem = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/factures.json', 'utf8')
    const list = JSON.parse(data)
    
    const itemToSave = {
      ...req.body
    }
    itemToSave.id = uuidv4()
    
    if (!itemToSave.num || itemToSave.num.trim().length < 1) {
      res.status(400).json({ error: true, message: 'Missing num or num too short' })
      return
    }
    if (!itemToSave.client || itemToSave.client.trim().length < 1) {
      res.status(400).json({ error: true, message: 'Missing client name' })
      return
    }
    if (!itemToSave.date) {
      res.status(400).json({ error: true, message: 'Missing date' })
      return
    }
    if (!itemToSave.description) {
      res.status(400).json({ error: true, message: 'Missing description' })
      return
    }
    if (!itemToSave.prestations) {
      itemToSave.prestations = []  
    }

    list.push(itemToSave)
    await fs.promises.writeFile('./db/factures.json', JSON.stringify(list, null, 2))

    res.json(itemToSave)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Error creating facture' })
  }
}

const deleteItem = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/factures.json', 'utf8')
    const list = JSON.parse(data)
    
    const itemToDelete = list.find(item => item.id == req.params.id)
    if (!itemToDelete) {
      res.status(404).json({ error: true, message:'Facture not found' })
      return
    }
    
    const listToSave = list.filter(item => item.id != req.params.id)

    await fs.promises.writeFile('./db/factures.json', JSON.stringify(listToSave, null, 2))

    res.json({ error: false, message: 'Facture deleted successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Error deleting facture' })
  }
}

export { getItems, getItem, patchItem, postItem, deleteItem }