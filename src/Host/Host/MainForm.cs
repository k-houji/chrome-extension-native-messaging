using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Host
{
    public partial class MainForm : Form
    {
        #region Public Methods
        /// <summary>
        /// コンストラクタ
        /// </summary>
        public MainForm()
        {
            InitializeComponent();

            this.MainTask();
        }
        #endregion

        #region Private Methods
        /// <summary>
        /// メイン処理
        /// </summary>
        async void MainTask()
        {
            while (true)
            {
                var message = await this.ReadStringAsync();
                if (message == null)
                {
                    break;
                }
            }

            this.Close();
        }

        /// <summary>
        /// 標準入力から読み込む
        /// </summary>
        async Task<Message> ReadStringAsync()
        {
            var stdin = Console.OpenStandardInput();

            byte[] text_length_bytes = new byte[4];
            await stdin.ReadAsync(text_length_bytes, 0, text_length_bytes.Length);

            int text_length = BitConverter.ToInt32(text_length_bytes, 0);

            this.Log(text_length.ToString());

            if (text_length == 0)
            {
                return null;
            }

            byte[] bytes = new byte[text_length];
            await stdin.ReadAsync(bytes, 0, bytes.Length);

            string json = Encoding.UTF8.GetString(bytes);

            this.Log(json);

            return Newtonsoft.Json.JsonConvert.DeserializeObject<Message>(json);
        }

        /// <summary>
        /// 標準出力に書き込む
        /// </summary>
        async Task WriteStringAsync(Message value)
        {
            var settings = new Newtonsoft.Json.JsonSerializerSettings()
            {
                NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore,
            };
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(value, settings);

            this.Log(json);

            var bytes = Encoding.UTF8.GetBytes(json);
            byte[] text_length_bytes = BitConverter.GetBytes(bytes.Length);

            var stdout = Console.OpenStandardOutput();

            await stdout.WriteAsync(text_length_bytes, 0, text_length_bytes.Length);
            await stdout.WriteAsync(bytes, 0, bytes.Length);
            await stdout.FlushAsync();
        }

        /// <summary>
        /// ログ出力
        /// </summary>
        void Log(string text)
        {
            this.textBoxLog.AppendText(text);
            this.textBoxLog.AppendText("\r\n");

            this.textBoxLog.SelectionStart = this.textBoxLog.TextLength;
            this.textBoxLog.ScrollToCaret();
        }

        /// <summary>
        /// メッセージ送信ボタン
        /// </summary>
        async void SendMessageButton_Click(object sender, EventArgs e)
        {
            string text = this.textBoxSendingMessage.Text;
            this.textBoxSendingMessage.Text = null;

            var message = new Message() { Value = text };
            await this.WriteStringAsync(message);
        }
        #endregion
    }
}
