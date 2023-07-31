import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from '../layout/TheButton.vue'
import BannerComponent from '../home/BannerComponent.vue'
import TheFooter from '../layout/TheFooter.vue'

describe('Home view', () => {
  it('Deve renderizar o botão com o texto passado pela props', () => {
    const wrapper = mount(Button, { props: { text: 'Button text' } })
    expect(wrapper.text()).toContain('Button text')
  })
  it('Deve renderizar uma imagem que tem um caminho definido e existe', () => {
    const wrapper = mount(BannerComponent)
    const imagem = wrapper.find('img')
    expect(imagem.attributes().src).toBeTruthy
    expect(imagem.attributes().src).not.toBe('');
  })
  it('Deve renderizar o footer com o texto de direitos autorais', () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.text()).toContain('Todos os direitos reservados')
  })
})
