import { Request, Response } from 'express'

export const slipValidator = (request: Request, response: Response) => {
  const { slipNumber } = request.params
  const splitNumber = slipNumber.split("")

  if(splitNumber.length < 47){
    return response.json("Quantidade de caracteres é menor que o esperado")
  } else {
    console.log("This slip number is valid")
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

  console.log(splitNumber[31])
  
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
  
  var ValidateDV1 = validateDV(block1, DVblock1)
  var ValidateDV2 = validateDV(block2, DVblock2)
  var ValidateDV3 = validateDV(block3, DVblock3)

  if ( ValidateDV1 === true && ValidateDV2 === true && ValidateDV3 === true) {
    return response.json("Código Válido")
    } 
  return response.json("Código Inválido")
}