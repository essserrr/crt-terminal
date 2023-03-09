import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const element = useRef<HTMLInputElement>();
  const inputEvent = useRef<React.FormEvent<HTMLInputElement>>();
  const onChangeEvent = useRef<React.ChangeEvent<HTMLInputElement>>();
  const inputTarget = useRef<EventTarget & HTMLInputElement>();
  const inputing = useRef(false);
  const {
    onCompositionEnd,
    onCompositionStart,
    onInput,
    onKeyDown,
    onChange,
    onFocus,
    onBlur,
    value,
    defaultValue,
    ...attrs
  } = props;
  const _value = ('value' in props) ? value : ('defaultValue' in props) ? defaultValue : null;

  const forceSetValue = useCallback(() => {
    if ('value' in props && element.current) {
      const input = element.current;
      input.value = value as string;
      input.setAttribute('value', value as string);
    }
  }, [value]);

  const onKeyDownInner = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // return when inputing chinese pinyin
    if (inputing.current) return;
    onKeyDown?.(e);
  };

  const onInputInner = (e: React.FormEvent<HTMLInputElement>) => {
    inputEvent.current = e;
    inputTarget.current = e.currentTarget;
    // return when inputing chinese pinyin
    if (inputing.current) return;
    onInput?.(e);
  };

  const onChangeInner = (e: React.ChangeEvent<HTMLInputElement>) => {
    // return when inputing chinese pinyin
    onChangeEvent.current = e;
    if (inputing.current) return;
    onChange?.(e);
  };

  const onCompositionStartInner = (e: React.CompositionEvent<HTMLInputElement>) => {
    inputing.current = true;
    onCompositionStart?.(e);
  };

  const onCompositionEndInner = (e: React.CompositionEvent<HTMLInputElement>) => {
    inputing.current = false;
    onCompositionEnd?.(e);
    if (onChangeEvent.current) {
      onChange?.(onChangeEvent.current);
    }
    if (inputTarget.current && inputEvent.current) {
      onInput?.({
        ...inputEvent.current,
        currentTarget: inputTarget.current
      });
    }
  };

  const onBlurInner = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(forceSetValue, 150);
    onBlur?.(e);
  };

  const onFocusInner = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(forceSetValue, 10);
    onFocus?.(e);
  };

  useImperativeHandle(ref, () => element.current as HTMLInputElement);

  useEffect(() => {
    if (value === element.current?.value) return;
    forceSetValue();
  }, [value, forceSetValue]);

  return (
    <input
      {...attrs}
      defaultValue={_value as string}
      ref={(input) => {
        if (!input) return;
        element.current = input;
        forceSetValue();
      }}
      onFocus={onFocusInner}
      onBlur={onBlurInner}
      onCompositionStart={onCompositionStartInner}
      onCompositionEnd={onCompositionEndInner}
      onInput={onInputInner}
      onKeyDown={onKeyDownInner}
      onChange={onChangeInner}
    />
  );
});

export default Input;
