import IBaseBox from '../IBaseBox';
import * as cheerio from 'cheerio';
import * as boxFragment from '../../fragment/box';
import Base from '../Base';
import Column from './Column';

export default class Row extends Base implements IBaseBox{
  $fragment: any;
  components: any = [];
  template: string;
  params: any;
  name: string = 'Row';

  constructor (data: any, storage: any) {
    super(storage);
    const { params = {} } = data;
    this.params = params;

    this.$fragment = cheerio.load(`
      <div class="box">
        <el-row></el-row>
      </div>
    `, {
      xmlMode: true,
      decodeEntities: false
    });
    this.initComponent(params.columns);
    this.renderBox();
  }

  initComponent (columns: number) {
    const arr = new Array(columns);
    arr.fill(1, 0);
    console.log(arr);
    arr.forEach(item => {
      this.components.push(new Column({span: 24 / arr.length}, this.storage));
    })
  }

  public setPreview () {
    this.renderBox();
  }


  renderBox () {
    this.$fragment('el-row').empty();
    this.components.forEach(item => {
      this.$fragment('el-row').append(item.getFragment(0).html())
    });
  }

  render () {}
  public getSetting () {}
}