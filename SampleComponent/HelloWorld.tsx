import * as React from 'react';
import { DetailsList, IColumn, ILinkStyles, Link } from '@fluentui/react';

export interface IHelloWorldProps {
  text: string;
}

interface IItem {
  id: string;
  name: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {


  makeid(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  private _onClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    console.log("this is the selected column", column);
  }

  generateItems() {
    const newItems: IItem[] = [];
    for (let i = 0; i < 6; i++) {
      newItems.push({
        id: i.toString(),
        name: this.makeid(5)
      });
    }
    return newItems;
  }

  private renderItemColumn = (item: IItem, index: number | undefined, column: IColumn | undefined): JSX.Element => {
    const fieldContent = item[column!.fieldName as keyof IItem] as string;

    return (
      <Link
        onClick={() => this.itemInvoked(item, column!)}
        style={{
          cursor: 'pointer'
        }}
      >
        {fieldContent}
      </Link>
    );
  }
  private columns: IColumn[] = [
    {
      key: 'name',
      name: 'Name',
      fieldName: 'name',
      minWidth: 100,
      isResizable: false,
      onRender: this.renderItemColumn
    }
  ];

  private itemInvoked = (item: IItem, column: IColumn) => {
    console.log("this is the item: ", item);
    console.log("this is the item prop ", this.props.text);
  }

  public render(): React.ReactNode {
    return (
      <DetailsList
        columns={this.columns}
        items={this.generateItems()}
        setKey='set'
      />
    );
  }
} 