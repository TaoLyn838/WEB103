const renderCharacters = async () => {
  const response = await fetch('/characters')
  const data = await response.json()

  const mainContent = document.getElementById('main-content')

  if (mainContent && data) {
    data.map((character) => {
      const card = document.createElement('div')
      card.classList.add(
        'flex',
        'flex-col',
        'justify-between',
        'my-6',
        'bg-white',
        'shadow-sm',
        'border',
        'border-slate-200',
        'rounded-lg',
        'w-96',
        'h-full'
      )

      const cardImgContainer = document.createElement('div')
      cardImgContainer.classList.add(
        'h-56',
        'm-2.5',
        'overflow-hidden',
        'rounded-md'
      )

      const cardTextContainer = document.createElement('div')
      cardTextContainer.classList.add('flex', 'flex-col', 'p-4')
      cardTextContainer.style.minHeight = '150px' // Set a minimum height

      const cardButtonContainer = document.createElement('div')
      cardButtonContainer.classList.add('mt-auto', 'p-4', 'pb-4', 'pt-0')

      const image = document.createElement('img')
      image.src = character.image_home
      image.alt = character.name
      cardImgContainer.appendChild(image)

      const characterName = document.createElement('h6')
      characterName.textContent = character.name
      characterName.classList.add(
        'mb-2',
        'text-slate-800',
        'text-xl',
        'font-semibold'
      )

      const characterDescription = document.createElement('p')
      characterDescription.textContent = character.description
      characterDescription.classList.add(
        'text-slate-600',
        'leading-normal',
        'font-light'
      )
      cardTextContainer.appendChild(characterName)
      cardTextContainer.appendChild(characterDescription)

      const moreInfoButton = document.createElement('a')
      moreInfoButton.textContent = 'More Info'
      moreInfoButton.href = `/characters/${character.id}`
      moreInfoButton.classList.add(
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-lg',
        'border',
        'border-transparent',
        'bg-gray-800',
        'text-white',
        'py-2',
        'px-3',
        'text-sm',
        'font-medium',
        'leading-4',
        'hover:bg-gray-900',
        'shadow-sm'
      )
      cardButtonContainer.appendChild(moreInfoButton)

      card.appendChild(cardImgContainer)
      card.appendChild(cardTextContainer)
      card.appendChild(cardButtonContainer)

      mainContent.appendChild(card)
    })
  } else {
    window.location.href = '../404.html'
  }
}

const renderCharacterInfo = async () => {
  const requestedID = parseInt(window.location.href.split('/').pop())
  const response = await fetch('/characters')
  const characters = await response.json()
  console.log('Fetched Character:', characters)

  const characterContent = document.getElementById('character-content')

  if (characterContent && characters) {
    // Correctly find the character using the array
    const character = characters.find((c) => c.id === requestedID)

    if (character) {
      document.getElementById('image').src = character.image_card
      document.getElementById('name').textContent = character.name
      document.getElementById('quality').textContent = character.quality
      document.getElementById('dob').textContent = character.dob
      document.getElementById('region').textContent = character.region
      document.getElementById('element').textContent = character.element
      document.getElementById('weapon').textContent = character.weapon
      document.getElementById('detail').textContent = character.detail
    } else {
      const message = document.createElement('p')
      message.textContent = 'Character not found'
      characterContent.appendChild(message)
    }
  } else {
    window.location.href = '../404.html'
  }
}

const requestedUrl = window.location.href.split('/').pop()

if (requestedUrl && requestedUrl !== '') {
  renderCharacterInfo()
} else {
  renderCharacters()
}
