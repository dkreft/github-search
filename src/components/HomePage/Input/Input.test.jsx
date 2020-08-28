import { shallow } from 'enzyme'

import Input from './Input'

import Styles from './styles.module.sass'


describe('<Input/>', () => {
  const ref = React.createRef()

  const handleKeyPress = jest.fn()
  const className = 'alsdkfjasldifj'
  const otherProps = {
    a: 1,
    b: 2,
  }

  subject(() => shallow(<Input
    { ...otherProps }
    className={ className }
    handleKeyPress={ handleKeyPress }
    ref={ ref }
  />))

  it('renders an <input>', () => {
    expect($subject).toMatchSelector('input')
  })

  it('has the expected props', () => {
    expect($subject).toHaveProp({
      onKeyPress: expect.any(Function),
      ...otherProps,
    })
  })

  it('has the forwarded ref', () => {
    expect($subject.instance()).toEqual(ref.current)
  })

  describe('the `className` prop', () => {
    it('has the `root` class', () => {
      expect($subject).toHaveClassName(Styles.root)
    })

    it('has the caller-supplied `className`', () => {
      expect($subject).toHaveClassName(className)
    })
  })

  describe('the `onKeyPress` handler', () => {
    def('e', () => ({
      stopPropagation: jest.fn(),
      key: 'f',
      target: {
        value: '9284',
      },
    }))

    subject(() => $subject.prop('onKeyPress'))

    beforeEach(() => {
      jest.spyOn(window.console, 'debug').mockImplementation()

      $subject($e)
    })

    it('stops propagation', () => {
      expect($e.stopPropagation).toHaveBeenCalled()
    })

    it('invokes `handleKeyPress` with `{ key, value }`', () => {
      expect(handleKeyPress).toHaveBeenCalledWith({
        key: $e.key,
        value: $e.target.value,
      })
    })
  })
})
