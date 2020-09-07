import { Request, Response } from 'express'
import StringMask from 'string-mask'
import rangeDates from '../rangeDates.json'

export const BankSlipValidator = (request: Request, response: Response) => {
  const { slipNumber } = request.params
  const splitNumber = slipNumber.split("")

  if(splitNumber.length != 47){
    return response.json({
      "slipNumber": slipNumber,
      "validNumber": false,
      "message": "Incorrect number of characters"  
    })
  }

  const block1 = [
    splitNumber[8],
    splitNumber[7],
    splitNumber[6],
    splitNumber[5],
    splitNumber[4],
    splitNumber[3],
    splitNumber[2],
    splitNumber[1],
    splitNumber[0]
  ]
  
  const DVblock1 = [
    splitNumber[9]
  ]
  
  const block2 = [
    splitNumber[19],
    splitNumber[18],
    splitNumber[17],
    splitNumber[16],
    splitNumber[15],
    splitNumber[14],
    splitNumber[13],
    splitNumber[12],
    splitNumber[11],
    splitNumber[10]
  ]
  
  const DVblock2 = [
    splitNumber[20]
  ]
  
  const block3 = [
    splitNumber[30],
    splitNumber[29],
    splitNumber[28],
    splitNumber[27],
    splitNumber[26],
    splitNumber[25],
    splitNumber[24],
    splitNumber[23],
    splitNumber[22],
    splitNumber[21]

  ]
  
  const DVblock3 = [
    splitNumber[31]
  ]
  
  const DVBarCode = [
    splitNumber[32]
  ]
  
  const dateFactor = [
    splitNumber[33],
    splitNumber[34],
    splitNumber[35],
    splitNumber[36]
  ]
  
  const value = [
    splitNumber[37],
    splitNumber[38],
    splitNumber[39],
    splitNumber[40],
    splitNumber[41],
    splitNumber[42],
    splitNumber[43],
    splitNumber[44],
    splitNumber[45],
    splitNumber[46]
  ]
  
  function validateDV (block, dv) {
    var sumBlock = 0

    for (var i = 0; i < block.length; i++) {
      if ( i % 2 === 0 ) {
        block[i] *= 2       
        if (block[i] >= 10) {
          block[i] = ((block[i] - block[i]%10)/10)+block[i]%10
        }   
      } else {
        block[i] *= 1
      }
      sumBlock += block[i]
    }
    if ((10 - (sumBlock%10)) === parseInt(dv[0])) {
      return true
    }
    return false
  }

  function validateDate (dateFactor) {
    var sumDateFactor = 0
    const now = new Date()
    const baseDate = new Date(rangeDates[0].base)
    
    for ( var i = 0; i < dateFactor.length; i++ ) {
      if ( i === 0 ) {
        sumDateFactor += dateFactor[i] - 1    
      } else {
        sumDateFactor += dateFactor[i]    
      }
    }
    
    const dueDate = new Date(baseDate.setDate(baseDate.getDate() + (sumDateFactor*1)))

    if ( now < dueDate ) {
      return ({
        dueDate,
        "message": "On time"
      })
    } else {
      return ({
        dueDate,
        "message": "Overdue"
      })
    }  
  }

  function validateValue(value) {
    var sumValue = 0
    
    for ( var i = 0; i < value.length; i++ ) {
        sumValue += value[i]
    }
    sumValue *= 1

    var formatter = new StringMask('#.##0,00', {reverse: true});
    var result = formatter.apply(sumValue)

    return result
  }

  const DV1 = validateDV(block1, DVblock1)
  const DV2 = validateDV(block2, DVblock2)
  const DV3 = validateDV(block3, DVblock3)
  const slipDate = validateDate(dateFactor)
  const slipValue = validateValue(value)
  
  
  if ( DV1 === true && DV2 === true && DV3 === true) {
    return response.json({
      "slipNumber": slipNumber,
      "validNumber": true,
      "slipValue": slipValue,
      "dueDate": slipDate.dueDate,
      "message": slipDate.message
    })
  } else {
    return response.json({
      "slipNumber": slipNumber,
      "validNumber": false,
      "message": "Invalid number"
    })
  }
}