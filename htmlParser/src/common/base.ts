declare global {
  interface String {
    _isEqualSymb(): boolean;
    _isBiggerSymb(): boolean;
    _isSmallerSymb(): boolean;
    _isSlash(): boolean;
    _isBlank(): boolean;
    _isExclamation(): boolean;
    _isDash(): boolean;
    _isLetter(): boolean;
    _isNumOrLetter(): boolean;
  }
}

String.prototype._isEqualSymb = function (): boolean {
  return this == '=';
};

String.prototype._isBiggerSymb = function (): boolean {
  return this == '>';
};

String.prototype._isSmallerSymb = function (): boolean {
  return this == '<';
};

String.prototype._isSlash = function (): boolean {
  return this == '/';
};

String.prototype._isBlank = function (): boolean {
  return this == ' ';
};

String.prototype._isExclamation = function (): boolean {
  return this == '!';
};

String.prototype._isDash = function (): boolean {
  return this == '-';
};

String.prototype._isLetter = function (): boolean {
  return /[A-z]/.test(this);
};


String.prototype._isNumOrLetter = function (): boolean {
  return /[A-z0-9]/.test(this);
};

interface PropProps {
  name: string,
  value?: string,
};
type PropKey = keyof PropProps;

class Prop {
  name: string;
  value: string;
  append (key: PropKey, value: string): void {
    this[key] = this[key] === void 0 ? value : this[key] + value;
  };
}

interface TokenProps {
  name: string,
};
type TokenKey = keyof TokenProps;

class Token {
  name: string;
  props?: Array<Prop | null>;
  type: string;
  selfClosed?: boolean;
  append (key: TokenKey, value: string): void {
    this[key] = this[key] + value;
  };

  constructor(initName: string, type: string ) {
    this.name = initName;
    this.type = type;
  }
}

class NoteTagToken extends Token {
  constructor(name: string) {
    super(name, 'note-tag');
    this.props = [];
  }
}

class BlankToken extends Token {
  constructor(name: string) {
    super(name, 'blank-token');
  }
}

class StartTagToken extends Token {
  constructor(name: string) {
    super(name, 'start-tag');
    this.props = [];
  }
};

class EndTagToken extends Token {
  constructor(name: string) {
    super(name, 'end-tag');
  }
}

class TextToken extends Token {
  constructor(name: string) {
    super(name, 'text-node')
  }
}

export  {
  StartTagToken,
  EndTagToken,
  NoteTagToken,
  TextToken,
  BlankToken,
  Prop,
  Token
};