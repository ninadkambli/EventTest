

describe('Validate traffic signal state', () => {
  it('Validate default state', () => {
    cy.visit('https://traffic-light-nine.vercel.app/')
    cy.validateSignalState(true,false,false)
    cy.validateStateWithinSeconds(3000,true,false,false)
  })

  it('Click on switch button when red signal is on - 1',()=>{
    cy.visit('https://traffic-light-nine.vercel.app/')
    cy.locateElement('switchButton').click()
    cy.validateStateWithinSeconds(900,true,true,false)
  })


  it('Click on switch button when red signal is on - 2',()=>{
    cy.clock()
    cy.visit('https://traffic-light-nine.vercel.app/')
    cy.locateElement('switchButton').click()
    cy.tick(1000)
    cy.clock().then((clock) => {
      clock.restore()
    })
    cy.validateStateWithinSeconds(3000,false,false,true)
    
  })

  it('Click on switch button twice within a one second when red signal is on - 1',()=>{
    cy.visit('https://traffic-light-nine.vercel.app/')
    cy.locateElement('switchButton').click()
    cy.wait(500)
    cy.locateElement('switchButton').click()
    cy.validateStateWithinSeconds(300,true,true,false)
  })


  it('Click on switch button twice within a one second when red signal is on - 2',()=>{
    cy.visit('https://traffic-light-nine.vercel.app/')
    cy.locateElement('switchButton').click()
    cy.wait(500)
    cy.locateElement('switchButton').click()
    cy.wait(600)
    cy.validateStateWithinSeconds(3000,false,false,true)
  })

  it('Click on switch button when green signal is on - 1',()=>{
    cy.clock()
    cy.visit('https://traffic-light-nine.vercel.app/')
    cy.locateElement('switchButton').click()
    cy.tick(1200)
    cy.clock().then((clock) => {
      clock.restore()
    })
    cy.locateElement('switchButton').click()
    
    cy.validateStateWithinSeconds(900,false,true,false)
  })


  it('Click on switch button when green signal is on - 2',()=>{
    cy.clock()
    cy.visit('https://traffic-light-nine.vercel.app/')
    cy.locateElement('switchButton').click()
    cy.tick(1200)
    cy.clock().then((clock) => {
      clock.restore()
    })
    cy.locateElement('switchButton').click()
    cy.clock()
    cy.tick(1200)
    cy.clock().then((clock) => {
      clock.restore()
    })
    cy.validateStateWithinSeconds(3000,true,false,false)
  })

  it('Click on switch button twice within a one second when green signal is on - 1',()=>{
    cy.clock()
    cy.visit('https://traffic-light-nine.vercel.app/')
    cy.locateElement('switchButton').click()
    cy.tick(1200)
    cy.clock().then((clock) => {
      clock.restore()
    })
    cy.locateElement('switchButton').click()
    cy.wait(500)
    cy.locateElement('switchButton').click()
    cy.validateStateWithinSeconds(300,false,true,false)
  })

  it('Click on switch button twice within a one second when green signal is on - 2',()=>{
    cy.clock()
    cy.visit('https://traffic-light-nine.vercel.app/')
    cy.locateElement('switchButton').click()
    cy.tick(1200)
    cy.clock().then((clock) => {
      clock.restore()
    })
    cy.locateElement('switchButton').click()
    cy.wait(500)
    cy.locateElement('switchButton').click()
    cy.wait(500)
    cy.validateStateWithinSeconds(3000,true,false,false)
  })

  it('Click random times',()=>{
    const randomNumber = Math.floor(Math.random() * 20 + 1)
    cy.visit('https://traffic-light-nine.vercel.app/')
    Cypress._.times(randomNumber,()=>{
      cy.wait(500)
      cy.locateElement('switchButton').click()
    })
    cy.wait(2000)
    cy.locateElement('Red').invoke('css', 'background-color')
    .then((bgcolor) =>{
        if(bgcolor =='rgb(255, 0, 0)'){
          cy.validateSignalState(true,false,false)
        }
        else{
          cy.validateSignalState(false,false,true)
        }
    })
  })


})