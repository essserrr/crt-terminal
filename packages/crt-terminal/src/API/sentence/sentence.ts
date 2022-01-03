type AnchorCallback = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
type ButtonCallback = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

enum WordTypes {
  ANCHOR = 'ANCHOR',
  TEXT = 'TEXT',
  BUTTON = 'BUTTON',
  COMMAND = 'COMMAND',
}

interface BaseWord {
  characters: string;
  dataAttribute?: string;
  className?: string;
  id?: string;
}

interface AnchorWord extends BaseWord {
  type: WordTypes.ANCHOR;
  href?: string;
  onClick?: AnchorCallback;
}

interface TextWord extends BaseWord {
  type: WordTypes.TEXT;
}

interface ButtonWord extends BaseWord {
  type: WordTypes.BUTTON;
  onClick?: ButtonCallback;
}

interface CommandWord extends BaseWord {
  type: WordTypes.COMMAND;
  prompt: string;
}

type Words = AnchorWord | TextWord | ButtonWord | CommandWord;

type AnchorProps = Omit<AnchorWord, 'type'>;

const anchorWord = ({
  characters,
  href,
  onClick,
  dataAttribute,
  className,
  id,
}: AnchorProps): AnchorWord => ({
  type: WordTypes.ANCHOR,
  characters,
  href,
  onClick,
  dataAttribute,
  id,
  className,
});

type TextProps = Omit<TextWord, 'type'>;

const textWord = ({ characters, dataAttribute, className, id }: TextProps): TextWord => ({
  type: WordTypes.TEXT,
  characters,
  dataAttribute,
  id,
  className,
});

type ButtonProps = Omit<ButtonWord, 'type'>;

const buttonWord = ({
  characters,
  onClick,
  dataAttribute,
  className,
  id,
}: ButtonProps): ButtonWord => ({
  type: WordTypes.BUTTON,
  characters,
  onClick,
  dataAttribute,
  id,
  className,
});

type CommandProps = Omit<CommandWord, 'type'>;

const commandWord = ({
  characters,
  prompt,
  dataAttribute,
  className,
  id,
}: CommandProps): CommandWord => ({
  type: WordTypes.COMMAND,
  characters,
  prompt,
  dataAttribute,
  className,
  id,
});

enum LineTypes {
  TEXT = 'TEXT',
  COMMAND = 'COMMAND',
}

interface BaseLine {
  words: Words[];
  dataAttribute?: string;
  className?: string;
  id?: string;
}

interface TextLine extends BaseLine {
  type: LineTypes.TEXT;
}

interface CommandLine extends BaseLine {
  type: LineTypes.COMMAND;
}

type Lines = TextLine | CommandLine;

type CommandLineProps = Omit<CommandLine, 'type'>;

const commandLine = ({ words, dataAttribute, className, id }: CommandLineProps): CommandLine => ({
  type: LineTypes.COMMAND,
  words,
  dataAttribute,
  className,
  id,
});

type TextLineProps = Omit<TextLine, 'type'>;

const textLine = ({ words, dataAttribute, className, id }: TextLineProps): TextLine => ({
  type: LineTypes.TEXT,
  words,
  dataAttribute,
  className,
  id,
});

export type { AnchorWord, TextWord, ButtonWord, Words, TextLine, CommandLine, Lines };
export {
  WordTypes,
  LineTypes,
  textWord,
  buttonWord,
  commandWord,
  anchorWord,
  commandLine,
  textLine,
};
